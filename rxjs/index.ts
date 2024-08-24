//////////////////////////////////////////////////////////
// Here we need to reference our other deep imports
// so VS code will figure out where they are
// see conversation here:
// https://github.com/microsoft/TypeScript/issues/43034
//////////////////////////////////////////////////////////

/* eslint-disable @typescript-eslint/triple-slash-reference */
// It's tempting to add references to all of the deep-import locations, but
// adding references to those that require DOM types breaks Node projects.
/// <reference path="./operators/index.ts" />
/// <reference path="./testing/index.ts" />
/* eslint-enable @typescript-eslint/triple-slash-reference */

/* Re-export from @/rxjs/observable/index */
export type { GlobalConfig, SubscriberOverrides } from './observable/observable'
export {
  Observable,
  from,
  config,
  Subscription,
  Subscriber,
  operate,
  UnsubscriptionError,
  isObservable,
} from './observable/observable'

/* Observables */
export type { GroupedObservable } from './internal/operators/groupBy'
export type { Operator } from './internal/Operator'
export { animationFrames } from './internal/observable/dom/animationFrames'

/* Subjects */
export { Subject } from './internal/Subject'
export { BehaviorSubject } from './internal/BehaviorSubject'
export { ReplaySubject } from './internal/ReplaySubject'
export { AsyncSubject } from './internal/AsyncSubject'

/* Schedulers */
export { asapScheduler } from './internal/scheduler/asap'
export { asyncScheduler } from './internal/scheduler/async'
export { queueScheduler } from './internal/scheduler/queue'
export { animationFrameScheduler } from './internal/scheduler/animationFrame'
export {
  VirtualTimeScheduler,
  VirtualAction,
} from './internal/scheduler/VirtualTimeScheduler'
export { Scheduler } from './internal/Scheduler'

/* Utils */
export { rx } from './internal/util/rx'
export { pipe } from './internal/util/pipe'
export { noop } from './internal/util/noop'
export { identity } from './internal/util/identity'

/* Promise Conversion */
export { lastValueFrom } from './internal/lastValueFrom'
export { firstValueFrom } from './internal/firstValueFrom'

/* Error types */
export { ArgumentOutOfRangeError } from './internal/util/ArgumentOutOfRangeError'
export { EmptyError } from './internal/util/EmptyError'
export { NotFoundError } from './internal/util/NotFoundError'
export { SequenceError } from './internal/util/SequenceError'
export { TimeoutError } from './internal/operators/timeout'

/* Static observable creation exports */
export { bindCallback } from './internal/observable/bindCallback'
export { bindNodeCallback } from './internal/observable/bindNodeCallback'
export { combineLatest } from './internal/observable/combineLatest'
export { concat } from './internal/observable/concat'
export { connectable } from './internal/observable/connectable'
export { defer } from './internal/observable/defer'
export { forkJoin } from './internal/observable/forkJoin'
export { fromEvent } from './internal/observable/fromEvent'
export { fromEventPattern } from './internal/observable/fromEventPattern'
export { generate } from './internal/observable/generate'
export { iif } from './internal/observable/iif'
export { interval } from './internal/observable/interval'
export { merge } from './internal/observable/merge'
export { of } from './internal/observable/of'
export { onErrorResumeNext } from './internal/observable/onErrorResumeNext'
export { partition } from './internal/observable/partition'
export { race } from './internal/observable/race'
export { range } from './internal/observable/range'
export { throwError } from './internal/observable/throwError'
export { timer } from './internal/observable/timer'
export { using } from './internal/observable/using'
export { zip } from './internal/observable/zip'
export { scheduled } from './internal/scheduled/scheduled'

/* Constants */
export { EMPTY } from './internal/observable/empty'
export { NEVER } from './internal/observable/never'

/* Types */
export * from './internal/types'

/* Operators */
export { audit } from './internal/operators/audit'
export { auditTime } from './internal/operators/auditTime'
export { buffer } from './internal/operators/buffer'
export { bufferCount } from './internal/operators/bufferCount'
export { bufferTime } from './internal/operators/bufferTime'
export { bufferToggle } from './internal/operators/bufferToggle'
export { bufferWhen } from './internal/operators/bufferWhen'
export { catchError } from './internal/operators/catchError'
export { combineLatestAll } from './internal/operators/combineLatestAll'
export { combineLatestWith } from './internal/operators/combineLatestWith'
export { concatAll } from './internal/operators/concatAll'
export { concatMap } from './internal/operators/concatMap'
export { concatMapTo } from './internal/operators/concatMapTo'
export { concatWith } from './internal/operators/concatWith'
export type { ConnectConfig } from './internal/operators/connect'
export { connect } from './internal/operators/connect'
export { count } from './internal/operators/count'
export { debounce } from './internal/operators/debounce'
export { debounceTime } from './internal/operators/debounceTime'
export { defaultIfEmpty } from './internal/operators/defaultIfEmpty'
export { delay } from './internal/operators/delay'
export { delayWhen } from './internal/operators/delayWhen'
export { dematerialize } from './internal/operators/dematerialize'
export { distinct } from './internal/operators/distinct'
export { distinctUntilChanged } from './internal/operators/distinctUntilChanged'
export { distinctUntilKeyChanged } from './internal/operators/distinctUntilKeyChanged'
export { elementAt } from './internal/operators/elementAt'
export { endWith } from './internal/operators/endWith'
export { every } from './internal/operators/every'
export { exhaustAll } from './internal/operators/exhaustAll'
export { exhaustMap } from './internal/operators/exhaustMap'
export { expand } from './internal/operators/expand'
export { filter } from './internal/operators/filter'
export { finalize } from './internal/operators/finalize'
export { find } from './internal/operators/find'
export { findIndex } from './internal/operators/findIndex'
export { first } from './internal/operators/first'
export type {
  BasicGroupByOptions,
  GroupByOptionsWithElement,
} from './internal/operators/groupBy'
export { groupBy } from './internal/operators/groupBy'
export { ignoreElements } from './internal/operators/ignoreElements'
export { isEmpty } from './internal/operators/isEmpty'
export { last } from './internal/operators/last'
export { map } from './internal/operators/map'
export { mapTo } from './internal/operators/mapTo'
export { materialize } from './internal/operators/materialize'
export { max } from './internal/operators/max'
export { mergeAll } from './internal/operators/mergeAll'
export { mergeMap } from './internal/operators/mergeMap'
export { mergeMapTo } from './internal/operators/mergeMapTo'
export { mergeScan } from './internal/operators/mergeScan'
export { mergeWith } from './internal/operators/mergeWith'
export { min } from './internal/operators/min'
export { observeOn } from './internal/operators/observeOn'
export { onErrorResumeNextWith } from './internal/operators/onErrorResumeNextWith'
export { pairwise } from './internal/operators/pairwise'
export { raceWith } from './internal/operators/raceWith'
export { reduce } from './internal/operators/reduce'
export type { RepeatConfig } from './internal/operators/repeat'
export { repeat } from './internal/operators/repeat'
export { repeatWhen } from './internal/operators/repeatWhen'
export type { RetryConfig } from './internal/operators/retry'
export { retry } from './internal/operators/retry'
export { retryWhen } from './internal/operators/retryWhen'
export { sample } from './internal/operators/sample'
export { sampleTime } from './internal/operators/sampleTime'
export { scan } from './internal/operators/scan'
export { sequenceEqual } from './internal/operators/sequenceEqual'
export type { ShareConfig } from './internal/operators/share'
export { share } from './internal/operators/share'
export type { ShareReplayConfig } from './internal/operators/shareReplay'
export { shareReplay } from './internal/operators/shareReplay'
export { single } from './internal/operators/single'
export { skip } from './internal/operators/skip'
export { skipLast } from './internal/operators/skipLast'
export { skipUntil } from './internal/operators/skipUntil'
export { skipWhile } from './internal/operators/skipWhile'
export { startWith } from './internal/operators/startWith'
export { subscribeOn } from './internal/operators/subscribeOn'
export { switchAll } from './internal/operators/switchAll'
export { switchMap } from './internal/operators/switchMap'
export { switchMapTo } from './internal/operators/switchMapTo'
export { switchScan } from './internal/operators/switchScan'
export { take } from './internal/operators/take'
export { takeLast } from './internal/operators/takeLast'
export { takeUntil } from './internal/operators/takeUntil'
export { takeWhile } from './internal/operators/takeWhile'
export type { TapObserver } from './internal/operators/tap'
export { tap } from './internal/operators/tap'
export type { ThrottleConfig } from './internal/operators/throttle'
export { throttle } from './internal/operators/throttle'
export { throttleTime } from './internal/operators/throttleTime'
export { throwIfEmpty } from './internal/operators/throwIfEmpty'
export { timeInterval } from './internal/operators/timeInterval'
export type { TimeoutConfig, TimeoutInfo } from './internal/operators/timeout'
export { timeout } from './internal/operators/timeout'
export { timeoutWith } from './internal/operators/timeoutWith'
export { timestamp } from './internal/operators/timestamp'
export { toArray } from './internal/operators/toArray'
export { window } from './internal/operators/window'
export { windowCount } from './internal/operators/windowCount'
export { windowTime } from './internal/operators/windowTime'
export { windowToggle } from './internal/operators/windowToggle'
export { windowWhen } from './internal/operators/windowWhen'
export { withLatestFrom } from './internal/operators/withLatestFrom'
export { zipAll } from './internal/operators/zipAll'
export { zipWith } from './internal/operators/zipWith'