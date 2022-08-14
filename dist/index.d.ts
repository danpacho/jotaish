import type { Atom, WritableAtom } from "jotai";
import type { SetAtom } from "jotai/core/atom";
declare type StringLiteral<Literal> = Literal extends string ? string extends Literal ? never : Literal : never;
declare type Awaited<T> = T extends Promise<infer V> ? Awaited<V> : T;
declare type ActionName<ActionObject, AtomName> = {
    [Action in keyof ActionObject as `${Action & string}${Capitalize<StringLiteral<AtomName>>}`]: ActionObject[Action];
};
declare type ReadWriteAction<Value, Update, Result extends void | Promise<void>> = {
    [""]: Awaited<Value>;
    set: SetAtom<Update, Result>;
    atomOf: WritableAtom<Value, Update, Result>;
};
declare type ReadWrite<Value, Update, Result extends void | Promise<void>, AtomName> = ActionName<ReadWriteAction<Value, Update, Result>, AtomName>;
declare type ReadOnlyAction<Value> = {
    [""]: Awaited<Value>;
    atomOf: Atom<Value>;
};
declare type ReadOnly<Value, AtomName> = ActionName<ReadOnlyAction<Value>, AtomName>;
declare function useStore<Value, Update, Result extends void | Promise<void>, AtomName>(Store: {
    atom: WritableAtom<Value, Update, Result>;
    key: AtomName;
}): ReadWrite<Value, Update, Result, AtomName>;
declare function useStore<Value, AtomName extends string>(Store: {
    atom: Atom<Value>;
    key: AtomName;
}): ReadOnly<Value, AtomName>;
export { useStore };
export * from "./getStore";
