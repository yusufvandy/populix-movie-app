import React from 'react';
import { View } from 'react-native';
import MovieListComponent from '@components/MovieList'
import { useSelector } from 'react-redux';

export const MovieList = ({ route, navigation }) => {
    // React.useEffect(() => {
    //     if (token) {
    //         dispatch(getAccountStates(route.params.id))
    //     }
    // }, [token])
    const { search } = useSelector(state => state.movie);

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            {
                route.params !== undefined && route.params?.type === 'search' ?
                    <MovieListComponent
                        navigation={navigation}
                        withBack
                        label="Search Results"
                        data={search}
                        emptyIcon="movie-search-outline"
                        emptyLabel={{ title: 'Not Found', subtitle: 'No result from your search.' }}
                    /> :
                    <MovieListComponent navigation={navigation} withBack={route.params.withBack} label={route.params.label} data={route.params.data} />
            }
        </View>
    )
}