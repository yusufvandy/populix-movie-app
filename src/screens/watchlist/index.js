import React from 'react';
import { View, Dimensions } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlist } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import SkeletonMovieList from '@components/skeleton/SkeletonMovieList';

export const Watchlist = () => {
    const win = Dimensions.get('window');
    const { loading, watchlist } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getWatchlist())
        }
    }, [isFocused])

    if (loading) return <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}><SkeletonMovieList /></View>
    if (!watchlist.length) return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="bookmark-outline" color="#ddd" size={80} />
            <Bold style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 15 }}>No Watchlist</Bold>
            <Regular style={{ textAlign: 'center', marginBottom: 5 }}>Try to add watchlist movie on movie detail.</Regular>
        </View>
    )

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ height: win.height * .3, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Semibold style={{ fontSize: 18, textAlign: 'center', marginBottom: 5 }}>Favorite Screen</Semibold>
            </View>
        </View>
    )
}