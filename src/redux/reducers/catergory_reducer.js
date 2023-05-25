const initialState = {
    category: ''
};

const catergory_reducer = (state = initialState, action) => {
    return {...state,category: action.type}
}

export default catergory_reducer;