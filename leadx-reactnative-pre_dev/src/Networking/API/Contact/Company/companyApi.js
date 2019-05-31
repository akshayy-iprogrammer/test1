import axios from "axios";
const SERVER_URL = 'http://18.218.221.9:8888/';



export const addCompany = (params) => {
    console.log(params);
    
    return axios.post(`${SERVER_URL}api/contact/company/add`, params)
        .then((addCompanyResponse) => {
            let response = addCompanyResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return true;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
  
}

export const listCompany = (params) => {
    return axios.post(`${SERVER_URL}api/contact/company/get`, params)
        .then((listCompanyResponse) => {
          let response = listCompanyResponse['data'];
            if (response.statusCode === 200 && response.hasOwnProperty('data')) {
                return response.data;
            }   
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
    
}

export const updateCompany = (params) => {

    return axios.put(`${SERVER_URL}api/contact/company/update`, params)
        .then((response) => {
            console.log('helloowwwwwww', response);
            return true;
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })

}

export const deleteCompany = (params) => {

    return axios.delete(`${SERVER_URL}api/contact/company/delete`, params)
        .then((response) => {
            console.log('helloowwwwwww', response);
            return true;
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}
