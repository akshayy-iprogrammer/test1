import { GET_NEWS, GET_FEEDS } from '../../Constants/actionConstants';

export function getNewsData(dataSource) {
    return {
        type: GET_NEWS,
        data: dataSource
    }
}

export function getFeedsData(dataSource) {
    return {
        type: GET_FEEDS,
        data: dataSource
    }
}