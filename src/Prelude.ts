import * as FT from "./types/FunctionTypes";
import { toArray } from "./utils/utils";

function curry<A, B, C>(f: FT.Fn2<A, B, C>): FT.CFn2<A, B, C>;
function curry<A, B, C, D>(f: FT.Fn3<A, B, C, D>): FT.CFn3<A, B, C, D>;
function curry<A, B, C, D, E>(f: FT.Fn4<A, B, C, D, E>): FT.CFn4<A, B, C, D, E>;
function curry<A, B, C, D, E, F>(f: FT.Fn5<A, B, C, D, E, F>): FT.CFn5<A, B, C, D, E, F>;
function curry<A, B, C, D, E, F, G>(f: FT.Fn6<A, B, C, D, E, F, G>): FT.CFn6<A, B, C, D, E, F, G>;
function curry<A, B, C, D, E, F, G, H>(f: FT.Fn7<A, B, C, D, E, F, G, H>): FT.CFn7<A, B, C, D, E, F, G, H>;
function curry<A, B, C, D, E, F, G, H>
    (f: FT.Fn2<A, B, C> | FT.Fn3<A, B, C, D> | FT.Fn4<A, B, C, D, E> | FT.Fn5<A, B, C, D, E, F> | FT.Fn6<A, B, C, D, E, F, G> | FT.Fn7<A, B, C, D, E, F, G, H>)
    : FT.CFn2<A, B, C> | FT.CFn3<A, B, C, D> | FT.CFn4<A, B, C, D, E> | FT.CFn5<A, B, C, D, E, F> | FT.CFn6<A, B, C, D, E, F, G> | FT.CFn7<A, B, C, D, E, F, G, H> {
    
    const len = f.length;
    return function curriedFn() {
        const args: any[] = toArray(arguments);
        if (args.length < len) {
            return function() {
                return curriedFn.apply(null, args.concat(toArray(arguments)));
            };
        }
        return f.apply(null, args);
    };
}
