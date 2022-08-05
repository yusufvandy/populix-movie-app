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
    const [token, setToken] = React.useState(null)
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading, upcoming, trending, popular: popularMovies } = useSelector(state => state.movie);
    const { loading: loadingTV, popular: popularTV } = useSelector(state => state.tv);

    // check user is logged in?
    React.useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('access_token')
            setToken(token)
        })();

        if (isFocused) {
            dispatch(getUpcoming())
            dispatch(getTrending())
            dispatch(getPopularMovie())
            dispatch(getPopularTv())
        }
    }, [])

    console.log(popularTV)

    return (
        <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 15, backgroundColor: '#1f1d2b' }}>
            <ProfileComponent token={token} loading={loading} />
            <SearchComponent loading={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieCardComponent loading={loading} data={upcoming} label="Upcoming Movies" screenUrl="" />
                <MovieCardComponent loading={loading} data={trending} label="Trending Today" screenUrl="" />
                <MovieCardComponent loading={loading} data={popularMovies} label="Popular Movies" screenUrl="" />
                <MovieCardComponent loading={loadingTV} data={popularTV} label="Popular TV" screenUrl="" />

                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    )
}