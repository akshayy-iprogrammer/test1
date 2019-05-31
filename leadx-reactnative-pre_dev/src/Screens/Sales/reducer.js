import { GET_SALES_LEAD_LIST, GET_REVENUE_TOTAL, SALES_ONGOING_TAB } from '../../Constants/actionConstants';

const salesCommunityInitialReducer = {
    salesActiveTabIndex: 0,
    salesLeadList: [],
    revenueTotalData: {},
    ongoingLeadsList: [],
    salesOngoinglength: 0,
}

export default salesCommunityReducer = (state = salesCommunityInitialReducer, action) => {
    switch (action.type) {
        case SALES_ONGOING_TAB:
            return {
                ...state,
                salesActiveTabIndex: action.data.index,
                salesOngoinglength: action.data.length
            }
        case GET_SALES_LEAD_LIST:
            return {
                ...state,
                salesLeadList: action.data
            }
        case GET_REVENUE_TOTAL:
            return {
                ...state,
                revenueTotalData: action.data
            }
        default:
            return state;
    }
}