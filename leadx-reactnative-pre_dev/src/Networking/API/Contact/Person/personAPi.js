import axios from "axios";
const SERVER_URL = 'http://18.218.221.9:8888/';



export const addPerson = (params) => {
    console.log(params);
    
    return axios.post(`${SERVER_URL}api/contact/person/add`, params)
    .then((addPersonResponse) => {
        console.log('helloowwwwwww', addPersonResponse);
         let response = addPersonResponse['data'];
         if (response.statusCode === 200 && response.hasOwnProperty('data')) {
             return response.data;
         }
    }).catch((err) => {
        console.log('ERROR:-', err)
        return false;
    })

}

export const updatePerson = (params) => {

    return axios.put(`${SERVER_URL}api/contact/person/update`, params)
    .then((response) => {
        console.log('helloowwwwwww', response);
        return true;
    }).catch((err) => {
        console.log('ERROR:-', err)
        return false;
    })

}

export const deletePerson = (params) => {

    return axios.delete(`${SERVER_URL}api/contact/person/delete`, params)
    .then((response) => {
        console.log('helloowwwwwww', response);
        return true;
    }).catch((err) => {
        console.log('ERROR:-', err)
        return false;
    })

}

export const getContactPersons = (params) => {

    return axios.post(`${SERVER_URL}api/contact/person/get`, params)
    .then((getPersonResponse) => {
        console.log('helloowwwwwww', getPersonResponse);
        let response = getPersonResponse['data'];
        if (response.statusCode === 200 && response.hasOwnProperty('data')) {
            return response.data;
        }
    }).catch((err) => {
        console.log('ERROR:-', err)
        return false;
    })

}