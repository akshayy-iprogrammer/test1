import { GET_PIPELINE_INFO, GET_PIPELINE_LEADS, ONGOING_TAB, CONTACT_TAB, GET_CONTACTS, REFRESH_ALL } from '../../Constants/actionConstants';

export function ongoingTab(data) {
    return {
        type: ONGOING_TAB,
        data: data
    }
}

export function contactTab(data) {
    return {
        type: CONTACT_TAB,
        data: data
    }
}

export function savePipeInfo(data) {
    return {
        type: GET_PIPELINE_INFO,
        data
    }
}

export function saveOnlingLeads(data) {
    return {
        type: GET_PIPELINE_LEADS,
        data
    }
}

export function saveContactsList(data) {
    return {
        type: GET_CONTACTS,
        data
    }
}

export function refreshAll(data) {
    return {
        type: REFRESH_ALL,
        data
    }
}