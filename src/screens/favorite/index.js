import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import MovieListComponent from '@components/MovieList';

export const Favorite = ({ navigation }) => {
    const { loading, favorites } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getFavorite())
        }
    }, [isFocused])

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <MovieListComponent
                navigation={navigation}
                label="Favorite Movies"
                emptyIcon="heart-circle-outline"
                emptyLabel={{ title: 'No Favorite', subtitle: 'Try to add favorites movie on movie detail.' }}
                loading={loading}
                data={favorites} />
        </View>
    )
}