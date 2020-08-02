declare namespace NodeJS {
    interface Global {
        ext: any
    }
}

type AsyncIdentityFuncType<T> = (arg: T) => Promise<T>;