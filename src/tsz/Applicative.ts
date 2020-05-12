import { Functor } from "./Functor";
import { Fn } from "../types/FunctionTypes";

export abstract class Applicative<F> extends Functor<F> {
    abstract pure<A>(a: A): F;
    abstract ap<A, B>(fa: F, ff: F): F;

    map<A, B>(fa: F, f: Fn<A, B>): F {
        return this.ap(fa, this.pure(f));
    }
}
