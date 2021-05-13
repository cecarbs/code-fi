const initialState = {
    isOpen: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_LIBRARY':
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return {
                ...state
            }
    }
}

export default uiReducer;