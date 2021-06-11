export const SET_VISIBILITY = "SET_VISIBILITY"

export const setVisibilityAction = (newState) => ({
    type: SET_VISIBILITY,
    payload: { isWindowVisible: newState }
});;

const reducer = (state = { isWindowVisible: true }, action) => {
    switch (action.type) {
        case SET_VISIBILITY:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;