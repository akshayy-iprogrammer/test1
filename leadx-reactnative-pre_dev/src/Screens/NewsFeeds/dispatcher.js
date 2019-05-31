import { getFeedsData } from './action';

export function getFeeds(dataSource) {
    return async dispatch => {
        dispatch(getFeedsData(dataSource))
    }
}