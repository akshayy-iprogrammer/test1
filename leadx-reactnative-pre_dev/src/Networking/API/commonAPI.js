import axios from "axios";
const SERVER_URL = 'http://18.218.221.9:8888/';

export const getCountries = (params) => {
    // console.log('params', params);

    return axios.post(`${SERVER_URL}api/master/territory/country`, params)
        .then((getCountryResponse) => {
            console.log('helloowwwwwww', getCountryResponse);
            let response = getCountryResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}

export const getStates = (params) => {
    // console.log('params', params);

    return axios.post(`${SERVER_URL}api/master/territory/country/state`, params)
        .then((getStateResponse) => {
            let response = getStateResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}

export const getCities = (params) => {
    // console.log('params', params);

    return axios.post(`${SERVER_URL}api/master/territory/country/state/city`, params)
        .then((getCityResponse) => {
            console.log('helloowwwwwww', getCityResponse);
            let response = getCityResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}


export const getCurrencies = (params) => {
    console.log('params', params);

    return axios.post(`${SERVER_URL}api/master/getMstCurrency`, params)
        .then((getCurrencyResponse) => {
            console.log('helloowwwwwww', getCurrencyResponse);
            let response = getCurrencyResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}

export const getLeadSources = (params) => {
    console.log('params', params);

    return axios.post(`${SERVER_URL}api/master/getMstLeadSource`, params)
        .then((getLeadSourcesResponse) => {
            console.log('helloowwwwwww', getLeadSourcesResponse);
            let response = getLeadSourcesResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}

export const getRevenueTotalData = (params) => {
    console.log('params', params);

    return axios.post(`${SERVER_URL}api/lead/revenueTotal`, params)
        .then((getRevenueTotalsResponse) => {
            console.log('helloowwwwwww', getRevenueTotalsResponse);
            let response = getRevenueTotalsResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}

export const getUsersList = (params) => {
    console.log('params', params);

    return axios.get(`${SERVER_URL}api/user/getUserList`, params)
        .then((getUsersListResponse) => {
            console.log('helloowwwwwww', getUsersListResponse);
            let response = getUsersListResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}
