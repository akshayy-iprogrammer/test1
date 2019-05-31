import { GET_PIPELINE_INFO, GET_PIPELINE_LEADS, ONGOING_TAB, CONTACT_TAB, GET_CONTACTS, REFRESH_ALL } from '../../Constants/actionConstants';

const pipelineReducer = {
    activeTabIndex: 0,
    pipelineInfo: {},
    ongoingLeadsList: [],
    ongoinglength: 0,
    contactLength: 0,
    contactsList: [],
    refreshAll: false
}

export default PipelineReducer = (state = pipelineReducer, action) => {
    switch (action.type) {
        case ONGOING_TAB:
            return {
                ...state,
                activeTabIndex: action.data.index,
                ongoinglength: action.data.length
            }
        case CONTACT_TAB:
            return {
                ...state,
                activeTabIndex: action.data.index,
                contactLength: action.data.length,
            }
        case GET_PIPELINE_INFO:
            return {
                ...state,
                pipelineInfo: action.data
            }
        case GET_PIPELINE_LEADS:
            return {
                ...state,
                ongoingLeadsList: action.data
            }
        case GET_CONTACTS:
            return {
                ...state,
                contactsList: action.data
            }
        case REFRESH_ALL:
            return {
                ...state,
                refreshAll: action.data
            }
        default:
            return state;
    }
}