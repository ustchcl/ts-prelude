import { Fn2 } from "../types/FunctionTypes";

export abstract class Semigroup<A> {
    abstract append(a1: A, a2: A): A;
}

class _AnonymousSemigroup<A> extends Semigroup<A> {
    m_append: Fn2<A, A, A>;
  
    constructor(append: Fn2<A, A, A>) {
        super();
        this.m_append = append
    }
  
    append(a1: A, a2: A): A {
        return this.m_append(a1, a2);
    }
}

export function semigroup<A>(append: Fn2<A, A, A>): Semigroup<A> {
    return new _AnonymousSemigroup<A>(append)
}

export const firstSemigroup = semigroup((a1, a2) => a1);
export const secondSemigroup = semigroup((a1, a2) => a2);

  