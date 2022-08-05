import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate as RootNavigation } from '../../App'
import { store } from './store'
import { logout } from '@features/accountSlicer'
import { Alert } from 'react-native'
import env from '../../env.config'

const { BASE_URL } = env;

export const API_URL = `${BASE_URL}/api/`

export const getApi = async (url) => {
    const token = await AsyncStorage.getItem('TOKEN')
    let headers = { 'Content-Type': 'application/json' }

    if (token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` }
    } else {
        headers = { ...headers, 'key': `guest` }
    }

    console.log('GET/', url);

    const instance = axios.create({ baseUrl: API_URL, headers: headers });

    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401 || error.response.status === 403) {
                Alert.alert(
                    'Session Expired',
                    'Please login to continue',
                    [
                        { text: 'OK', onPress: () => (store.dispatch(logout()), RootNavigation('ONBOARDING_SCREEN')) },
                    ],
                    { cancelable: false }
                )
                return
            }
            return error
        });
    return instance.get(API_URL + url, { headers })
}

export const postApi = async (url, payload) => {
    const token = await AsyncStorage.getItem('TOKEN')
    let headers = { 'Content-Type': 'application/json' }

    if (token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` }
    }

    console.log('POST/', url);

    return axios.post(API_URL + url,
        payload,
        { headers }
    )
}

export const postUploadApi = async (url, payload) => {
    const token = await AsyncStorage.getItem('TOKEN')
    let headers = { 'Content-Type': 'multipart/form-data' }

    if (token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` }
    }

    console.log('FORMDATA/', url);

    return axios.post(API_URL + url,
        payload,
        { headers }
    )
}

export const putApi = async (url, payload) => {
    const token = await AsyncStorage.getItem('TOKEN')

    console.log('PUT/', url);

    return axios.put(API_URL + url,
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
    const token = await AsyncStorage.getItem('TOKEN')

    console.log('DELETE/', url);

    return axios.delete(API_URL + url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}