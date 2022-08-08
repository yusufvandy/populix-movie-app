import React from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postRequestToken, postAccessToken, setLoading, logout } from '@features/accountSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const win = Dimensions.get('window');

const Skeleton = () => (
    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
        <Placeholder width='20%' Animation={Fade}>
            <PlaceholderLine style={{ height: 60, borderRadius: 100, backgroundColor: '#444' }} width={80} />
        </Placeholder>
        <Placeholder width='80%' Animation={Fade}>
            <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
            <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} width={30} />
        </Placeholder>
    </View >
)

const VerificationView = ({ handleClose, handleSuccessApprove, request_token }) => (
    <View style={{ position: 'absolute', width: win.width, backgroundColor: "#032541", height: win.height - 50, zIndex: 99 }}>
        <View style={{ flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
            <Semibold color="#333" size={18}>Login Page</Semibold>
            <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, padding: 13 }} onPress={() => handleClose()}>
                <Ionicons name={"close"} size={24} />
            </TouchableOpacity>
        </View>
        {
            request_token &&
            <WebView
                onNavigationStateChange={(e) => {
                    //  condition if approve success
                    if (e.navigationType === undefined && e.url === 'https://www.themoviedb.org/') {
                        handleSuccessApprove()
                    }
                }}
                incognito={true}
                source={{ uri: `https://www.themoviedb.org/auth/access?request_token=${request_token}` }}
            />
        }
    </View>
)

export default ProfileComponent = ({ loading, navigation }) => {
    const [showWebView, setShowWebView] = React.useState(false)
    const [token, setToken] = React.useState({ access_token: null, request_token: null })
    const dispatch = useDispatch();
    const { request_token } = useSelector(state => state.account);

    const handlePostRequestToken = () => {
        !token.access_token && setShowWebView(true)
        !token.request_token && dispatch(postRequestToken())
    }

    const handleSuccessApprove = () => {
        setShowWebView(false)
        dispatch(setLoading(true))
        dispatch(postAccessToken())
    }

    // trigger reactive token
    React.useEffect(() => {
        (async () => {
            const ls_access_token = await AsyncStorage.getItem('access_token')
            const ls_request_token = await AsyncStorage.getItem('request_token')
            setToken({ access_token: ls_access_token, request_token: ls_request_token })
        })();
    }, [request_token])

    if (loading) return <Skeleton />
    if (showWebView) return (<VerificationView
        handleClose={() => setShowWebView(false)}
        handleSuccessApprove={() => handleSuccessApprove()}
        request_token={token.request_token} />
    )
    if (!token.access_token) return (
        <View>
            <TouchableOpacity
                onPress={() => handlePostRequestToken()}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Image style={{ width: 75, height: 55, marginRight: 15 }} source={{ uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1280px-Tmdb.new.logo.svg.png` }} />
                <View>
                    <Bold size={18}>Welcome!</Bold>
                    <Regular>Please <Regular color="#0cc1cf">login</Regular> to continue.</Regular>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <View>
            <TouchableOpacity
                disabled={token.access_token}
                onPress={() => handlePostRequestToken()}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', marginRight: 15, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: '#0cc1cf', borderRadius: 100 }}><Bold size={20} color="white">YU</Bold></View>
                <View>
                    <Bold size={18}>Welcome back!</Bold>
                    <Regular size={12}>Member since August 2022</Regular>
                </View>
                <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => dispatch(logout()).then(() => navigation.navigate('HOME_SCREEN'))}>
                    <MaterialCommunityIcons name={"logout"} size={20} color="#ff8591" />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}