export type Constructor<T = object, U = object> = {
    new(...args: any[]): T,
    prototype: T
} & U;