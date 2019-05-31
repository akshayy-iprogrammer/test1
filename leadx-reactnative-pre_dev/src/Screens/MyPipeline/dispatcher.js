import { ongoingTab, contactTab, savePipeInfo, saveOnlingLeads, saveContactsList, refreshAll } from './action';

export function ongoingTabControl(data) {
    return async dispatch => {
        dispatch(ongoingTab(data))
    }
}

export function contactTabControl(data) {
    return async dispatch => {
        dispatch(contactTab(data))
    }
}

export function setPipeInfo(data) {
    return async dispatch => {
        dispatch(savePipeInfo(data))
    }
}

export function setOngoingLeads(data) {
    return async dispatch => {
        dispatch(saveOnlingLeads(data))
    }
}

export function setContacts(data) {
    return async dispatch => {
        dispatch(saveContactsList(data))
    }
}

export function refresh(data) {
    return async dispatch => {
        dispatch(refreshAll(data))
    }
}