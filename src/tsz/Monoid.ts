import { Semigroup } from "./Semigroup";
import { Fn2, Fn } from "../types/FunctionTypes";

abstract class Monoid<A> extends Semigroup<A> {
    abstract get zero(): A;
}

class _AnonymousMonoid<A> extends Monoid<A> {
    m_zero: Fn<void, A>;
    m_append: Fn2<A, A, A>;
  
    constructor(zero: Fn<void, A>, append: Fn2<A, A, A>) {
        super();
        this.m_zero = zero;
        this.m_append = append;
    }

    get zero() {
        return this.m_zero();
    }

    append(a1: A, a2: A): A {
        return this.m_append(a1, a2);
    }
}

export function monoid<A>(zero: Fn<void, A>, append: Fn2<A, A, A>) {
    return new _AnonymousMonoid(zero, append);
}