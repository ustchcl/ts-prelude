import { Fn } from "../types/FunctionTypes";

class Option<A> {
    fold<B>(ifSome: Fn<A, B>, ifNone: Fn<void, B>): B {
        if ( this instanceof Some) {
            return ifSome(this.value);
        } else {
            return ifNone();
        }
    }

    get isSome(): boolean {
        return this instanceof Some
    }

    get isNone(): boolean {
        return !this.isSome
    }


    static None<A>(): Option<A> {
        return new None<A>();
    }
    
    static Some<A>(a: A): Option<A> {
        return new Some<A>(a);
    }
}

export class None<A> extends Option<A> {
    constructor() {
        super();
    }
}

export class Some<A> extends Option<A> {
    value: A;
    constructor(a: A) {
        super();
        this.value = a;
    }
}