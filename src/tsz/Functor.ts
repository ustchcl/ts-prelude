import { Fn } from "../types/FunctionTypes";

export abstract class Functor<F> {
    abstract map<A, B>(fa: F, f: Fn<A, B>): F;
}