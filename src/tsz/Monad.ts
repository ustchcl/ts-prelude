import { Applicative } from "./Applicative";
import { Fn } from "../types/FunctionTypes";

export abstract class Monad<F> extends Applicative<F> {
    abstract bind<A, B>(fa: F, f: Fn<A, F>): F;

    join(ffa: F): F {
        return this.bind(ffa, _ => (_ as any));
    }

    map<A, B>(fa: F, f: Fn<A, B>) {
      return this.bind(fa, (a: A) => this.pure(f(a)));
    }
    
    ap<A, B>(fa: F, ff: F) {
      return this.bind(ff, (_: A) => this.map(fa, f));
    }
    
} 
