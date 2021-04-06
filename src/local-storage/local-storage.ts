export const saveState = (state: any) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('notes', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('notes');
        if (serializedState === null) {
            return undefined;
        }
        let data = JSON.parse(serializedState)
        return data;
    } catch (err) {
        return undefined;
    }
};

export const deleteState  = () => {
    localStorage.removeItem('notes')
}