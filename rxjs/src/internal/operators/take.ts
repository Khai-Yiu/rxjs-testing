import type { MonoTypeOperatorFunction } from '../types.js';
import { EMPTY } from '../observable/empty.js';
import { Observable, operate } from '@rxjs/observable';

/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * ![](take.png)
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * ## Example
 *
 * Take the first 5 seconds of an infinite 1-second interval Observable
 *
 * ```ts
 * import { interval, take } from 'rxjs';
 *
 * const intervalCount = interval(1000);
 * const takeFive = intervalCount.pipe(take(5));
 * takeFive.subscribe(x => console.log(x));
 *
 * // Logs:
 * // 0
 * // 1
 * // 2
 * // 3
 * // 4
 * ```
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param count The maximum number of `next` values to emit.
 * @return A function that returns an Observable that emits only the first
 * `count` values emitted by the source Observable, or all of the values from
 * the source if the source emits fewer than `count` values.
 */
export function take<T>(count: number): MonoTypeOperatorFunction<T> {
  return count <= 0
    ? // If we are taking no values, that's empty.
      () => EMPTY
    : (source) =>
        new Observable((destination) => {
          let seen = 0;
          const operatorSubscriber = operate<T, T>({
            destination,
            next: (value) => {
              if (++seen < count) {
                destination.next(value);
              } else {
                operatorSubscriber.unsubscribe();
                destination.next(value);
                destination.complete();
              }
            },
          });
          source.subscribe(operatorSubscriber);
        });
}
