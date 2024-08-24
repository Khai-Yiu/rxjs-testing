import { UnaryFunction } from "./pipe";

type NextObserver<T> = {
  closed?: boolean;
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
};

type ErrorObserver<T> = {
  closed?: boolean;
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
};

type CompletionObserver<T> = {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
};

type Observer<T> = {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
  closed: boolean;
  add: (functionToCallWhenFinalizing: UnsubscribeFunction) => void;
};

type UnsubscribeFunction = () => void;

interface SubscriptionInterface {
  unsubscribe: () => void;
}

type Notification = {
  kind: NotificationType;
  error: unknown;
};

enum NotificationType {
  ERROR = "E",
}

interface Config {
  onStoppedNotification: ((notification: Notification) => void) | null;
}

export const config: Config = {
  onStoppedNotification: null,
};

export class Subscription implements SubscriptionInterface {
  unsubscribe: UnsubscribeFunction;
  constructor(unsubscribeFunction: UnsubscribeFunction | Subscription) {
    this.unsubscribe =
      unsubscribeFunction instanceof Function
        ? unsubscribeFunction
        : unsubscribeFunction.unsubscribe.bind(unsubscribeFunction);
  }

  // add(unsubscribeFunction: UnsubscribeFunction | Subscription) {
  //   const wrappedUnsubscribe = this.unsubscribe;

  //   if (unsubscribeFunction instanceof Function) {
  //     unsubscribeFunction();
  //   } else {
  //     unsubscribeFunction.unsubscribe();
  //   }

  //   wrappedUnsubscribe();
  // }
}

interface ObservableInterface<T> {
  subscribe: (observer?: Partial<Observer<T>>) => void;
  forEach: (fnCalledEachIteration: (value: T) => void) => Promise<void>;
  pipe<T, R>(...functions: Array<UnaryFunction<any, any>>): R;
}

export default class Observable<T> implements ObservableInterface<T> {
  #emitValuesToObserver: (observer: Observer<T>) => UnsubscribeFunction;

  constructor(
    emitValuesToObserver: (observer: Observer<T>) => UnsubscribeFunction | void
  ) {
    this.#emitValuesToObserver = (observer: Observer<T>) => {
      try {
        const result = emitValuesToObserver(observer);
        return result ? result : () => {};
      } catch (error) {
        if (config.onStoppedNotification) {
          config.onStoppedNotification({
            kind: NotificationType.ERROR,
            error,
          });
        } else {
          observer.error(error);
        }
        return () => {};
      }
    };
  }

  subscribe(observer?: Observer<T> | Partial<Observer<T>>) {
    let unsubscribe: UnsubscribeFunction = () => {};
    const errorWrapper =
      observer instanceof Function
        ? unsubscribe
        : (value: T) => {
            if (observer.error !== undefined) {
              observer.error(value);
            }

            unsubscribe();
          };

    unsubscribe = this.#emitValuesToObserver({
      next: () => {},
      complete: () => {},
      closed: false,
      ...observer,
      error: errorWrapper,
      add: (functionToCallWhenFinalizing: UnsubscribeFunction) => {
        const wrappedUnsubscribe = unsubscribe;
        unsubscribe = () => {
          functionToCallWhenFinalizing();
          wrappedUnsubscribe();
        };
      },
    });

    return new Subscription(unsubscribe);
  }

  pipe(...functions: Array<UnaryFunction<any, any>>) {
    if (functions.length === 0) {
      return this;
    }

    return functions.reduce((previousResult, pipelineFn) => {
      return pipelineFn(previousResult);
    }, this);
  }

  forEach(handleNext: (value: T) => void) {
    let closed = false;
    return new Promise<void>((resolve, reject) => {
      this.subscribe({
        next: (value: T) => {
          try {
            if (!closed) {
              handleNext(value);
            }
          } catch (err) {
            closed = true;
            reject(err);
          }
        },
        error: reject,
        complete: resolve,
      });
    });
  }

  [Symbol.asyncIterator]() {
    const results: T[] = [];
    let isComplete = false;
    const subscriber = {
      next: (value: T) => {
        results.push(value);
      },
      error: (err: T) => {
        results.push(err);
      },
      complete: () => {
        isComplete = true;
      },
    };

    let subscription: Subscription;
    return {
      next: () => {
        subscription === undefined &&
          (subscription = this.subscribe(subscriber));
        if (isComplete && results.length === 0) {
          return {
            done: true,
          };
        }

        const value = results.shift();
        if (value instanceof Error) {
          throw value;
        }

        return {
          value,
          done: false,
        };
      },
      return: () => {
        subscription.unsubscribe();
        return {
          value: undefined,
          done: true,
        };
      },
      throw: (exception?: Error) => {
        subscription.unsubscribe();
        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}
