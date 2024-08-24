export { Observable, Subscriber, Subscription, UnsubscriptionError, config, from, isObservable, operate } from './_observable.js';
export type { GlobalConfig, SubscriberOverrides } from './_observable.js';

// TODO: reevaluate these as part of public API of @rxjs/observable? They aren't exported from rxjs so feel more internal?
export {
  COMPLETE_NOTIFICATION,
  ObservableInputType,
  createNotification,
  errorNotification,
  fromArrayLike,
  getObservableInputType,
  isArrayLike,
  isFunction,
  isPromise,
  nextNotification,
  readableStreamLikeToAsyncGenerator,
  subscribeToArray,
} from './_observable.js';
