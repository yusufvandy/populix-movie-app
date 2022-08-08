import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate as RootNavigation } from '../../App'
import { store } from './store'
import { logout } from '@features/accountSlicer'
import { Alert } from 'react-native'
import { BASE_URL, V4AUTH } from "@env"

let headers = { 'Content-Type': 'application/json' }
if (V4AUTH) headers = { ...headers, 'Authorization': `Bearer ${V4AUTH}` }

const instance = axios.create({ baseUrl: BASE_URL });
instance.interceptors.response.use(
    response => response,
    error => {
        console.log(error.response)
        if (error.response.status === 401 || error.response.status === 403) {
            Alert.alert(
                'Session Expired',
                'Your token has expired. Please login to continue',
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

export const postApi = async (version, url, payload, accessToken) => {
    console.log('POST/', BASE_URL + `${version}/` + url);
    if (accessToken !== undefined) instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return instance.post(BASE_URL + `${version}/` + url, payload,
        { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken !== undefined ? accessToken : V4AUTH}` }
    )
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

export const putApi = async (version, url, payload, accessToken) => {
    console.log('PUT/', BASE_URL + `${version}/` + url);
    if (accessToken !== undefined) instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return instance.put(BASE_URL + `${version}/` + url, payload,
        { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken !== undefined ? accessToken : V4AUTH}` }
    )
}

export const deleteApi = async (version, url, accessToken) => {
    console.log('DELETE/', BASE_URL + `${version}/` + url);
    if (accessToken !== undefined) instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return instance.delete(BASE_URL + `${version}/` + url,
        { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken !== undefined ? accessToken : V4AUTH}` }
    )
}