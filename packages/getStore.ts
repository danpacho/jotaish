const getStore =
    <Store>(store: Store) =>
    <Key extends keyof Store>(
        key: Key
    ): Readonly<{
        atom: Store[Key];
        key: Key;
    }> => ({
        atom: store[key],
        key,
    });

export { getStore };
