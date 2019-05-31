import { getNewsData, getFeedsData } from './action';

export function getNews(dataSource) {
    return async dispatch => {
        dispatch(getNewsData(dataSource))
    }
}

export function getFeeds(dataSource) {
    return async dispatch => {
        dispatch(getFeedsData(dataSource))
    }
}