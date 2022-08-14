import { useAtom } from "jotai";

import type { Atom, WritableAtom } from "jotai";
import type { SetAtom } from "jotai/core/atom";

type StringLiteral<Literal> = Literal extends string
    ? string extends Literal
        ? never
        : Literal
    : never;
type Awaited<T> = T extends Promise<infer V> ? Awaited<V> : T;

type ActionName<ActionObject, AtomName> = {
    [Action in keyof ActionObject as `${Action & string}${Capitalize<
        StringLiteral<AtomName>
    >}`]: ActionObject[Action];
};

type ReadWriteAction<Value, Update, Result extends void | Promise<void>> = {
    [""]: Awaited<Value>;
    set: SetAtom<Update, Result>;
    atomOf: WritableAtom<Value, Update, Result>;
};
type ReadWrite<
    Value,
    Update,
    Result extends void | Promise<void>,
    AtomName
> = ActionName<ReadWriteAction<Value, Update, Result>, AtomName>;

type ReadOnlyAction<Value> = {
    [""]: Awaited<Value>;
    atomOf: Atom<Value>;
};
type ReadOnly<Value, AtomName> = ActionName<ReadOnlyAction<Value>, AtomName>;

function useStore<
    Value,
    Update,
    Result extends void | Promise<void>,
    AtomName
>(Store: {
    atom: WritableAtom<Value, Update, Result>;
    key: AtomName;
}): ReadWrite<Value, Update, Result, AtomName>;

function useStore<Value, AtomName extends string>(Store: {
    atom: Atom<Value>;
    key: AtomName;
}): ReadOnly<Value, AtomName>;

function useStore<
    Value,
    Update,
    Result extends void | Promise<void>,
    AtomName extends string
>(Store: {
    atom: Atom<Value> | WritableAtom<Value, Update, Result>;
    key: AtomName;
}) {
    const capitalizedKey = `${Store.key[0].toUpperCase()}${Store.key.slice(1)}`;
    const [state, setState] = useAtom(Store.atom);
    const manager = {
        [`${capitalizedKey}`]: state,
        [`set${capitalizedKey}`]: setState,
        [`atomOf${capitalizedKey}`]: Store.atom,
    };

    return manager;
}
export { useStore };
export * from "./getStore";
