class Tuple<A, B> {
    #data: [A, B];

    constructor(a: A, b: B) {
        this.#data = [a, b];
    }

    get fst() {
        return this.#data[0]
    }

    get snd() {
        return this.#data[1];
    }

    get swap(): Tuple<B, A> {
        return tuple(this.snd, this.fst);
    }
}

export function tuple<A, B>(data: [A, B]): Tuple<A, B>;
export function tuple<A, B>(a: A, b: B): Tuple<A, B>
export function tuple<A, B>(a: any, b?: B): Tuple<A, B> {
    if (b) {
        return new Tuple(a, b);
    } else {
        return new Tuple(a[0], a[1]);
    }
}