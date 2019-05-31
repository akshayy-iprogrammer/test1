import { GET_NEWS, GET_FEEDS } from '../../Constants/actionConstants';

const newsInitialReducer = {
    newsCardData: [],
    feedList: []
}

export default newsReducer = (state = newsInitialReducer, action) => {
    switch (action.type) {
        case GET_NEWS:
            console.log('news reducer---------');
            return {
                ...state,
                newsCardData: state.newsCardData.concat(action.data)
            }
        case GET_FEEDS:
            console.log('feeds reducer---------');
            return {
                ...state,
                feedList: state.feedList.concat(action.data)
            }
        default:
            return state;
    }
}