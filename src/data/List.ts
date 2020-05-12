import { Fn, Fn2 } from "../types/FunctionTypes";
import { not, compose } from "../utils/utils";

type Predicator<A> = (value: A, index: number, array: A[]) => boolean

export class List<A> {
    #list: Array<A>;
    constructor();
    constructor(arr: Array<A>);
    constructor(length: number);
    constructor(length: number, initialValue: A);
    constructor(_1?: any, _2?: any) {
        if (typeof _1 == "object") {
            this.#list = _1;
        } else {
            if (_1) {
                this.#list = new Array<A>(_1);
            } else {
                this.#list = new Array();
            }
            if (_2) {
                for (let i = 0; i < this.#list.length; ++i) {
                    this.#list[i] = _2;
                }
            }
        }
    }

    [index: number] : A;

    get array(): Array<A> {
        // let b = this[1]
        return this.#list;
    }

    forEach(callbackfn: (value: A, index: number, array: A[]) => void): void {
        this.array.forEach(callbackfn);
    }

    toString(): string {
        return "List { " + this.array.toString() + " }"; 
    }
    

    mappend(list: List<A>): List<A> {
        return new List<A>(this.#list.concat(list.array))
    }

    get head(): A | null {
        return  this.#list[0]; 
    }

    get last(): A | null{
        return this.#list[this.#list.length - 1];
    }

    get tail(): List<A>  {
        return new List<A>(this.array.slice(1, this.length));
    }

    get init(): List<A> {
        return new List<A>(this.array.slice(0, this.length - 1));
    }

    elementAt(n: number): A | null {
        return this.array[n];
    }

    get length(): number {
        return this.array.length;
    }

    get reversed(): List<A> {
        return new List<A>(this.array.reverse());
    }

    // building list
    scanl<B>(f: Fn2<B, A, B>, initialValue: B): List<B> {
        let arr = new Array<B>(this.length + 1);
        arr[0] = initialValue;
        for (let i = 0; i < this.length; ++i) {
            arr[i + 1] = f(arr[0], this.elementAt(i));
        }
        return new List<B>(arr);        
    }

    scanl1(f: Fn2<A, A, A>): List<A> {
        if (this.length == 0) {
            return new List<A>();
        }
        let arr = new Array<A>(this.length);
        arr[0] = this.elementAt(0);
        for (let i = 1; i < this.length; ++i) {
            arr[i] = f(arr[i - 1], this.elementAt(i));
        }
        return new List<A>(arr);
    }

    // search 
    indexOf(a: A) {
        return this.array.indexOf(a);
    }

    find(predicator: Predicator<A>) {
        return this.array.find(predicator)
    }

    findIndex(predicator: Predicator<A>) {
        return this.array.findIndex(predicator)
    }

    // sublist
    slice(start: number, end: number) {
        return new List<A>(this.array.slice(start, end));
    }

    take(n: number): List<A> {
        return this.slice(0, n);
    }

    skip(n: number): List<A> {
        return this.slice(n, this.length);
    }

    takeWhile(predicator: Predicator<A>) {
        const index = this.findIndex(predicator);
        return this.take(index);
    }

    skipWhile(predicator: Predicator<A>) {
        const index = this.findIndex(predicator);
        return this.skip(index);
    }

    span(f: Predicator<A>): [List<A>, List<A>] {
        return [this.filter(f), this.reject(f)];
    }

    break(f: Predicator<A>): [List<A>, List<A>] {
        return [this.takeWhile(f), this.skipWhile(f)];
    }

    splitAt(n: number):  [List<A>, List<A>] {
        return [this.take(n), this.skip(n)];
    }


    // zip
    zip<B>(list: List<B>): List<[A, B]> {
        return this.zipWith((l, r) => [l, r], list);
    }

    zipWith<B, C>(f: Fn2<A, B, C>, list: List<B>): List<C> {
        let arr = new Array<C>(Math.min(this.length, list.length));
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = f(this.elementAt(i), list.elementAt(i));
        }
        return new List(arr); 
    }


    filter(predicator: Predicator<A>): List<A> {
        return new List<A>(this.#list.filter(predicator));
    }

    reject(predicator: Predicator<A>): List<A> {
        return new List<A>(this.#list.filter(compose(not, predicator)));
    }

    map<B>(f: Fn<A, B>): List<B> {
        return new List<B>(this.#list.map(f));
    }

    flatMap<B>(f: Fn<A, List<B>>): List<B> {
        return this.map(f).reduce((p, c) => c.mappend(p));
    }


    // reduce
    reduce(f: (previousValue: A, currentValue: A, currentIndex: number, array: A[]) => A): A {
        return this.array.reduce(f);
    }


}

