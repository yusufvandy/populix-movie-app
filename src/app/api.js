import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate as RootNavigation } from '../../App'
import { store } from './store'
import { logout } from '@features/accountSlicer'
import { Alert } from 'react-native'
import { BASE_URL } from "@env"

let headers = { 'Content-Type': 'application/json' }
const token = AsyncStorage.getItem('access_token')
if (token) headers = { ...headers, 'Authorization': `Bearer ${token}` }

const instance = axios.create({ baseUrl: BASE_URL, headers: headers });
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            Alert.alert(
                'Session Expired',
                'Please login to continue',
                [
                    { text: 'OK', onPress: () => (store.dispatch(logout()), RootNavigation('HOME_SCREEN')) },
                ],
                { cancelable: false }
            )
            return
        }
        return error
    });

export const getApi = async (version, url) => {
    console.log('GET/', BASE_URL + `${version}/` + url);
    return instance.get(BASE_URL + `${version}/` + url, { headers })
}

export const postApi = async (version, url, payload) => {
    console.log('POST/', BASE_URL + `${version}/` + url);
    return instance.post(BASE_URL + version + url, payload, { headers })
    // return axios.post(BASE_URL + url,
    //     payload,
    //     { headers }
    // )
}

export const postUploadApi = async (url, payload) => {
    const token = await AsyncStorage.getItem('access_token')
    let headers = { 'Content-Type': 'multipart/form-data' }

    if (token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` }
    }

    console.log('FORMDATA/', url);

    return axios.post(BASE_URL + url,
        payload,
        { headers }
    )
}

export const putApi = async (url, payload) => {
    const token = await AsyncStorage.getItem('access_token')

    console.log('PUT/', url);

    return axios.put(BASE_URL + url,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export const deleteApi = async (url) => {
    const token = await AsyncStorage.getItem('access_token')

    console.log('DELETE/', url);

    return axios.delete(BASE_URL + url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}