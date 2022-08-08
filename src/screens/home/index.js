import React from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming, getTrending, getPopular, getTopRated } from '@features/movieSlicer';
import { useIsFocused } from '@react-navigation/native';
import ProfileComponent from '@components/home/Profile'
import SearchComponent from '@components/home/Search'
import MovieCardComponent from '@components/home/MovieCard'

export const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading: loadingMovie, upcoming, trending, popular, top } = useSelector(state => state.movie);
    const { loading: loadingAccount } = useSelector(state => state.account);

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getUpcoming())
            dispatch(getTrending())
            dispatch(getPopular())
            dispatch(getTopRated())
        }
    }, [isFocused])

    return (
        <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 15, backgroundColor: '#1f1d2b' }}>
            <ProfileComponent loading={loadingAccount} />
            <SearchComponent loading={loadingMovie} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieCardComponent navigation={navigation} loading={loadingMovie} data={upcoming} label="Upcoming Movies" viewAllUrl="" />
                <MovieCardComponent navigation={navigation} loading={loadingMovie} data={popular} label="Popular Movies" viewAllUrl="" />
                <MovieCardComponent navigation={navigation} loading={loadingMovie} data={trending} label="Trending Today" viewAllUrl="" />
                <MovieCardComponent navigation={navigation} loading={loadingTV} data={top} label="Top Rated Movies" viewAllUrl="" />
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    )
}