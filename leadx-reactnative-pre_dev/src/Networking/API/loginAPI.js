import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
// const SERVER_URL = 'http://192.168.151.130:8888/';

export const checkLogin = (params) => {
    return axios.post('http://18.218.221.9:8888/api/login/checkLogin', params)
        .then((response) => {
            console.log(response);
            
            if (response.data.statusCode < 400) {
                AsyncStorage.setItem('username', response.data.data.name);
                AsyncStorage.setItem('avatar', response.data.data.user_avatar);
                AsyncStorage.setItem('userId', JSON.stringify(response.data.data.id));
                return true;
            } else {
                return false;
            }
        }).catch((err) => {
            console.log('ERROR:-', err)
            return false;
        })
}