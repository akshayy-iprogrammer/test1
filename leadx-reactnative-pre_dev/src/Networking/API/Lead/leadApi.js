import axios from "axios";
const SERVER_URL = 'http://18.218.221.9:8888/';
// const SERVER_URL = 'http://192.168.151.130:8888/';


export const addLead = (params) => {
    console.log(params);

    return axios.post(`${SERVER_URL}api/lead/add`, params)
        .then((addLeadResponse) => {
            console.log(addLeadResponse,'addLeadResponserrrrrrrrrrrrrrrrrrrrrrr');
            
            let response = addLeadResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return true;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}

export const getLeadList = (params) => {
    console.log(params);

    return axios.post(`${SERVER_URL}api/lead/getList`, params)
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