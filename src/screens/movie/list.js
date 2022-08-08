import React from 'react';
import { View } from 'react-native';
import MovieListComponent from '@components/MovieList'

export const MovieList = ({ route, navigation }) => {
    // React.useEffect(() => {
    //     if (token) {
    //         dispatch(getAccountStates(route.params.id))
    //     }
    // }, [token])

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <MovieListComponent navigation={navigation} withBack={route.params.withBack} label={route.params.label} data={route.params.data} />
        </View>
    )
}