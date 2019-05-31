import { loadingApp } from './action';

export function loadAppData() {
    return async dispatch => {
        dispatch(loadingApp())
    }
}
