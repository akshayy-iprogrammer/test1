import { GET_FEEDS_LIST } from '../../Constants/actionConstants';

export function getFeedsData(dataSource) {
    return {
        type: GET_FEEDS_LIST,
        data: dataSource
    }
}