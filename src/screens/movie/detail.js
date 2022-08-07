import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import Header from '@components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '@features/movieSlicer';
import { useIsFocused } from '@react-navigation/native';
import { IMG_URL } from "@env"
import { LinearGradient } from 'expo-linear-gradient';

export const MovieDetail = ({ route, navigation }) => {
    const win = Dimensions.get('window');
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading, detail } = useSelector(state => state.movie);

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getMovieDetail(route.params.id))
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}>
            {/* <Header back title={route.params.title} navigation={navigation} /> */}
            {
                detail &&
                <>
                    <Image style={{ width: win.width, height: 220 }} source={{ uri: `${IMG_URL}${detail.backdrop_path}` }} />
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['transparent', '#1f1d2b']}
                        style={{ height: 50, position: 'absolute', top: 227, left: 0, width: win.width, zIndex: 99 }}
                    />
                    <View style={{ padding: 15 }}>
                        <Bold size={24}>{detail.title}</Bold>
                    </View>
                </>
            }
        </View>
    )
}