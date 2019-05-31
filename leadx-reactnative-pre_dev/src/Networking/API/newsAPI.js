import axios from "axios";

export const newsList = (params) => {
    return axios.post('http://18.218.221.9:8888/api/salesNews/get', params)
        .then((response) => {
            if (response.data.statusCode < 400) {
                return response.data.data.rows;
            } else {
                return false;
            }
        }).catch((err) => {
            console.log('ERROR:', err);
            return false;
        })
}

export const newsFeedList = (params) => {
    return axios.post('http://18.218.221.9:8888/api/salesFeed/get', params)
        .then((response) => {
            if (response.data.statusCode < 400) {
                return response.data.data.rows;
            } else {
                return false;
            }
        }).catch((err) => {
            return false;
        })
}
