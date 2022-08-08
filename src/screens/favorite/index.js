import React from 'react';
import { View, Dimensions } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import MovieListComponent from '@components/MovieList';

export const Favorite = ({ navigation }) => {
    const win = Dimensions.get('window');
    const { loading, favorites } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getFavorite())
        }
    }, [isFocused])

    if (!favorites.length) return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name="heart-circle-outline" color='#ddd' size={80} />
            <Bold style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 15 }}>No Favorite</Bold>
            <Regular style={{ textAlign: 'center', marginBottom: 5 }}>Try to add favorites movie on movie detail.</Regular>
        </View>
    )

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <MovieListComponent navigation={navigation} label="Favorite Movies" loading={loading} data={favorites} />
        </View>
    )
}