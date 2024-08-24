import { subscribeOn } from "../rxjs";
import { Subscriber } from "../rxjs_implementation";
import Observable from "./observable";
import { UnaryFunction } from "./pipe";

type TakeFunction<T> = UnaryFunction<Observable<T>, Observable<T>>;

function take(
  numberOfValuesToAccept: number
): <T>(sourceObservable: Observable<T>) => Observable<T> {
  return (sourceObservable) => {
    return new Observable((observer) => {
      if (numberOfValuesToAccept <= 0) {
        observer.complete();
      } else {
        let sourceSubscriber;
        const subscriber = {
          next: (value: any) => {
            if (numberOfValuesToAccept > 0) {
              numberOfValuesToAccept--;
              observer.next(value);
            }

            if (numberOfValuesToAccept <= 0) {
              subscriber.closed = false;
              observer.complete();
              sourceSubscriber.unsubscribe();
            }
          },
          complete: () => {
            observer.complete();
            subscriber.closed = true;
          },
          error: observer.error,
        };
        sourceSubscriber = sourceObservable.subscribe(subscriber);

        return sourceSubscriber.unsubscribe.bind(sourceSubscriber);
      }
    });
  };
}

export default take;
