import { GET_FEEDS_LIST } from '../../Constants/actionConstants';

const feedScreenReducer = {
    feedsList: []
}

export default feedsReducer = (state = feedScreenReducer, action) => {
    switch (action.type) {
        case GET_FEEDS_LIST:
            console.log('state-==-=-==', state.feedsList.length);
            return {
                ...state,
                feedsList: state.feedsList.concat(action.data)
            }
        default:
            return state;
    }
}