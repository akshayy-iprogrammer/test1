import { LOAD_DATA } from '../../Constants/actionConstants';

const splashInitialReducer = {
    splash: false
}

export default splashReducer = (state = splashInitialReducer, action) => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                splash: true
            }
        default:
            return state;
    }
}