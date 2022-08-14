<div align="center">

<h1> Jotaish🃏 </h1>

> Better **[Jotai](https://jotai.org)** _DX_ with **Jotaish**

</div>

- [Get started](#get-started)
- [The Problem](#the-problem)
  - [Large scale problem list](#large-scale-problem-list)
- [The Solution](#the-solution)
- [Adoptation](#adoptation)
  - [Without Jotaish🃏](#without-jotaish)
  - [With Jotaish🃏](#with-jotaish)
- [How to use](#how-to-use)
- [Return value according to Atom type](#return-value-according-to-atom-type)
  - [CASE1. Primitive, Read-Write Atom](#case1-primitive-read-write-atom)
  - [CASE2. Read Only Atom](#case2-read-only-atom)
  - [CASE3. Write Only Atom](#case3-write-only-atom)
- [Size](#size)
- [LICENSE](#license)

# Get started

```bash
pnpm i jotaish
```

# The Problem

> In Short, as scale of number of atoms becomes larger, managing them becomes more harder.

## Large scale problem list

1. When using atom, you might have to declare and naming the state and setter's name everytime using it.
2. Custom hook logic might reduce this effort. But that means each atom require own custom hook. It is not DRY.
3. You should remember declared atom's name to import it with vscode autocompletion.

# The Solution

> Consistent `name` and `import` with magical ✨autocomplete✨

1. Categorize atoms by usage (📢 user requirements)
2. Autocomplete atom's name
3. Autocomplete atom-state-setter's name

# Adoptation

## Without Jotaish🃏

```ts
// ❌ import each atoms, name state-setter
import { useAtom } from "jotai";
import { count } from "@atoms/count";

const [count, setCount] = useAtom(count);

// ❌ use custom hook for each atoms
import { useCountHook } from "@atoms/count";

const { count, setCount } = useCountHook();
```

## With Jotaish🃏

```ts
// ✅  use magical ✨autocompletion✨.
import { $, useStore } from "@atoms/index";

const { Count, setCount } = useStore($("count"));
```

`$` function autocompletes all atom's name

# How to use

1. Make Atom `Store`

at `*/atom/countAtoms.ts`

```ts
import { atom } from "jotai";

const count = atom(1);
const isCountEven = atom((get) => get(count) % 2 === 0);
```

at `*/atom/index.ts`

```ts
const Store = {
    count,
    isCountEven,
} as const; // ✅ It is much safer with const-assertion
```

[const assertion 🚩](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

2. Make `$` function and export `$`, `useStore` function in one file

at `*/atom/index.ts`

```ts
import { count, isCountEven } from "./countAtoms";
import { getStore, useStore } from "jotaish";

const Store = {
    count,
    isCountEven,
} as const;

const $ = getStore(Store); // ✅ You can choose diffrent name like _, _s!
export { $, useStore };
```

3. Use atoms in the component

```tsx
import { useStore, $ } from "@atoms/index";

const Counter = () => {
    const { Count, setCount } = useStore($("count"));
    const { IsCountEven, setIsCountEven } = useStore($("isCountEven"));

    return (
        <div>
            <h1>Count: {Count}</h1>
            <h2>{IsCountEven ? "Even" : "Odd"}</h2>

            <button onClick={() => setCount((c) => c + 1)}>Plus 🔺</button>
            <button onClick={() => setCount((c) => c - 1)}>Minus 🔻</button>
        </div>
    );
};
```

# Return value according to Atom type

> All `Return` value is 🃏-fully-jotai-typed-🃏

## CASE1. Primitive, Read-Write Atom

```ts
// primitive 🟩
const count = atom(1);

// read-write 🟩
const increaseCountTextAndAction = atom(
    (get) => `count is: ${get(count)}`,
    (get, set) => set(count, get(count) + 1)
);
```

> 🔔 Returns `state` & `setter` & `atom` itself

```ts
const { Count, setCount, atomOfCount } = useStore($("count"));
```

## CASE2. Read Only Atom

```ts
// read-only 🟨
const isEven = atom((get) => get(count) % 2 === 0);
```

> 🔔 Returns `state` & `atom` itself

```ts
const { IsEven, atomOfIsEven } = useStore($("isEven"));
```

## CASE3. Write Only Atom

```ts
// write-only 🟦
const updateCount = atom(
    null, // for specifying writing atom
    (get, set, newCount: number) => set(count, newCount)
);
```

> 🔔 Returns `state` & `setter` & `atom` itself

But **`state` = `null`**, Just ignore it and don't destruct.

```ts
const { setUpdateCount, atomOfUpdateCount } = useStore($("updateCount"));
```

# Size

```bash
# ✅ ESM ======================================
dist/jotaish.es.js   0.31 KiB / gzip: 0.22 KiB
# ✅ UMD ======================================
dist/jotaish.umd.js   0.54 KiB / gzip: 0.35 KiB
```

# LICENSE

MIT
