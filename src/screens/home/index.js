import React from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming, getTrending, getPopular as getPopularMovie } from '@features/movieSlicer';
import { getPopular as getPopularTv } from '@features/tvSlicer';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileComponent from '@components/home/Profile'
import SearchComponent from '@components/home/Search'
import MovieCardComponent from '@components/home/MovieCard'

export const Home = () => {
    const [token, setToken] = React.useState({ access_token: null, request_token: null })
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading: loadingMovie, upcoming, trending, popular: popularMovies } = useSelector(state => state.movie);
    const { loading: loadingTV, popular: popularTV } = useSelector(state => state.tv);
    const { loading: loadingAccount } = useSelector(state => state.account);

    // check user is logged in?
    React.useEffect(() => {
        // (async () => {
        //     const access_token = await AsyncStorage.getItem('access_token')
        //     const request_token = await AsyncStorage.getItem('request_token')
        //     setToken({ access_token: access_token, request_token: request_token })
        // })();

        if (isFocused) {
            dispatch(getUpcoming())
            dispatch(getTrending())
            dispatch(getPopularMovie())
            dispatch(getPopularTv())
        }
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 15, backgroundColor: '#1f1d2b' }}>
            <ProfileComponent loading={loadingAccount} />
            <SearchComponent loading={loadingMovie} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieCardComponent loading={loadingMovie} data={upcoming} label="Upcoming Movies" screenUrl="" />
                <MovieCardComponent loading={loadingMovie} data={trending} label="Trending Today" screenUrl="" />
                <MovieCardComponent loading={loadingMovie} data={popularMovies} label="Popular Movies" screenUrl="" />
                <MovieCardComponent loading={loadingTV} data={popularTV} label="Popular TV" screenUrl="" />
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    )
}