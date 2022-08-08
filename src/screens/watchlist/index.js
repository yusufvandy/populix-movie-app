import React from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlist } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import MovieListComponent from '@components/MovieList';

export const Watchlist = ({ navigation }) => {
    const win = Dimensions.get('window');
    const { loading, watchlist } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getWatchlist())
        }
    }, [isFocused])

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <MovieListComponent
                navigation={navigation}
                label="Watchlist Movies"
                emptyIcon="bookmark-outline"
                emptyLabel={{ title: 'No Watchlist', subtitle: 'Try to add watchlist movie on movie detail.' }}
                loading={loading}
                data={watchlist} />
        </View>
    )
}