import { getLeadList, getTotalRevenue, ongoingTab } from './action';

export function ongoingTabControl(data) {
    return async dispatch => {
        dispatch(ongoingTab(data))
    }
}

export function getLeadListData(dataSource) {
    return async dispatch => {
        dispatch(getLeadList(dataSource))
    }
}

export function getRevenueTotal(dataSource) {
    return async dispatch => {
        dispatch(getTotalRevenue(dataSource))
    }
}