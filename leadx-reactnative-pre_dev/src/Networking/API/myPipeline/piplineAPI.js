import axios from 'axios';

export const getInfo = (params) => {
    return axios.post('http://18.218.221.9:8888/api/lead/revenueTotal', params)
        .then((response) => {
            if (response.data.statusCode < 400) {
                return response.data.data
            } else {
                return false;
            }
        }).catch((err) => {
            console.log('ERROR:', err);
            return false;
        })
}


export const getLeadsList = (params) => {
    return axios.post(`http://18.218.221.9:8888/api/lead/getList`, params)
        .then((getLeadListResponse) => {
            let response = getLeadListResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}


export const getContactsList = (params) => {
    return axios.post(`http://18.218.221.9:8888/api/contact/person/getList`, params)
        .then((response) => {
            if (response.data.statusCode < 400 && response.data.hasOwnProperty('data')) {
                return response.data.data;
            } else {
                return false
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}