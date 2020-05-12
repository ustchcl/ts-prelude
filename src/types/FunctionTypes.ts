export type Fn<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;
export type Fn4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E;
export type Fn5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F;
export type Fn6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G;
export type Fn7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H;

export type CFn2<A, B, C> = (a: A) => (b: B) => C;
export type CFn3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D;
export type CFn4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E;
export type CFn5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F;
export type CFn6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G;
export type CFn7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H;