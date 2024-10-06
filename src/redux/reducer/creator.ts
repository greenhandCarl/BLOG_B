// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReducer = (initialState: any, handlers: any) => (state = initialState, action: { type: string }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
    }
    return state
};

export default createReducer;
