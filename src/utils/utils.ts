import { Fn } from "../types/FunctionTypes";

export function compose<B, C>(f: Fn<B, C>, g: (...args: any) => B) {
    return (...args: any) => f(g(...args));
}

export function not(b: boolean): boolean {
    return !b;
}

export function toArray(arrlike: any) {
    let arr = new Array(arrlike.length)
    for (let i = 0; i < arrlike.length; ++i) {
        arr[i] = arrlike[i]
    }
    return arr
}