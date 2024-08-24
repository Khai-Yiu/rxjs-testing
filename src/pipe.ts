export type UnaryFunction<T, R> = (input: T) => R;
type VariadicFunction<T extends any[], R> = (...args: T) => R;

function pipe<A extends any[], B>(f1: VariadicFunction<A, B>): B;
function pipe<A extends any[], B, C>(
  f1: VariadicFunction<A, B>,
  f2: UnaryFunction<B, C>
): C;
function pipe<A extends any[], B, C, D>(
  f1: VariadicFunction<A, B>,
  f2: UnaryFunction<B, C>,
  f3: UnaryFunction<C, D>
): D;
function pipe<A extends any[], B, C, D, E>(
  f1: VariadicFunction<A, B>,
  f2: UnaryFunction<B, C>,
  f3: UnaryFunction<C, D>,
  f4: UnaryFunction<D, E>
): E;
