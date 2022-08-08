import React from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming, getTrending, getPopular, getTopRated } from '@features/movieSlicer';
import { useIsFocused } from '@react-navigation/native';
import ProfileComponent from '@components/home/Profile'
import SearchComponent from '@components/home/Search'
import MovieCardComponent from '@components/MovieCard'

export const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading, upcoming, trending, popular, top } = useSelector(state => state.movie);
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
        <View style={{ flex: 1, padding: 15, backgroundColor: '#1f1d2b' }}>
            <ProfileComponent loading={loadingAccount} />
            <SearchComponent loading={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieCardComponent navigation={navigation} loading={loading} data={upcoming} label="Upcoming Movies" allData={upcoming} />
                <MovieCardComponent navigation={navigation} loading={loading} data={popular} label="Popular Movies" allData={popular} />
                <MovieCardComponent navigation={navigation} loading={loading} data={trending} label="Trending Today" allData={trending} />
                <MovieCardComponent navigation={navigation} loading={loading} data={top} label="Top Rated Movies" allData={top} />
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    )
}