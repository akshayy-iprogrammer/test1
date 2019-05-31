import { GET_SALES_LEAD_LIST, GET_REVENUE_TOTAL, SALES_ONGOING_TAB } from '../../Constants/actionConstants';


export function ongoingTab(data) {
    return {
        type: SALES_ONGOING_TAB,
        data: data
    }
}

export function getLeadList(dataSource) {
    return {
        type: GET_SALES_LEAD_LIST,
        data: dataSource
    }
}

export function getTotalRevenue(dataSource) {
    return {
        type: GET_REVENUE_TOTAL,
        data: dataSource
    }
}