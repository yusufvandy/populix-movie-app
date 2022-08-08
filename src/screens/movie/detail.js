import React from 'react';
import { View, Dimensions, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import SkeletonMovieDetail from '@components/skeleton/SkeletonMovieDetail';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail, getCredits, getSimilar, getAccountStates } from '@features/movieSlicer';
import { markFavorite, markWatchlist } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import { IMG_URL } from "@env"
import { LinearGradient } from 'expo-linear-gradient';
import MovieCardComponent from '@components/home/MovieCard'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MovieDetail = ({ route, navigation }) => {
    const win = Dimensions.get('window');
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [token, setToken] = React.useState(null)
    const { loading, detail, casts, similar, detailAccountState } = useSelector(state => state.movie);

    React.useEffect(() => {
        if (isFocused) {
            (async () => {
                const ls_access_token = await AsyncStorage.getItem('access_token')
                setToken(ls_access_token)
            })();

            dispatch(getMovieDetail(route.params.id))
            dispatch(getCredits(route.params.id))
            dispatch(getSimilar(route.params.id))
        }
    }, [isFocused])

    React.useEffect(() => {
        if (token) {
            dispatch(getAccountStates(route.params.id))
        }
    }, [token])

    // React.useEffect(() => {
    //     console.log("casts ", JSON.stringify(casts, null, 2));
    // }, [casts])

    const ActionButton = () => {
        const handleAction = (type) => {
            type === 'favorite' && dispatch(markFavorite({ id: route.params.id, state: !detailAccountState?.favorite })).then(() => dispatch(getAccountStates(route.params.id)))
            type === 'watchlist' && dispatch(markWatchlist({ id: route.params.id, state: !detailAccountState?.watchlist })).then(() => dispatch(getAccountStates(route.params.id)))
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -10 }}>
                <TouchableOpacity onPress={() => handleAction('favorite')} style={{ paddingHorizontal: 12 }}>
                    {
                        detailAccountState?.favorite ?
                            <AntDesign name="heart" size={20} color='red' /> :
                            <AntDesign name="hearto" size={20} color='#ddd' />
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction('watchlist')} style={{ paddingHorizontal: 12 }}>
                    {
                        detailAccountState?.watchlist ?
                            <MaterialIcons name="bookmark" color='#0cc1cf' size={24} /> :
                            <MaterialIcons name="bookmark-outline" color='#ddd' size={24} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    if (loading) return <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}><SkeletonMovieDetail /></View>
    return (
        <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}>
            {
                detail &&
                <ScrollView>
                    <TouchableOpacity style={{ position: 'absolute', top: 20, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 5, zIndex: 99 }} onPress={() => navigation.goBack()}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={20} />
                    </TouchableOpacity>
                    <Image style={{ width: win.width, marginTop: 10, height: 220 }} source={{ uri: `${IMG_URL}${detail.backdrop_path}` }} />
                    <LinearGradient
                        colors={['transparent', '#1f1d2b']}
                        style={{ height: 50, position: 'absolute', top: 180, left: 0, width: win.width, zIndex: 99 }}
                    />
                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="star" color="#f9bd2a" size={14} style={{ marginRight: 5 }} />
                                <Semibold size={16}>{detail.vote_average.toFixed(1)}</Semibold>
                                <Regular size={16} style={{ marginLeft: 4 }}>• {`${Math.trunc(detail.runtime / 60)}h ${detail.runtime % 60}m`}</Regular>
                            </View>
                            {token && detailAccountState && <ActionButton />}
                        </View>
                        <Bold style={{ marginBottom: 6 }} size={24}>{detail.title}</Bold>
                        <Regular>{detail.genres.map((el, i) => <Regular key={i}>{el.name}, </Regular>)} • {moment(detail.release_date).format('DD MMM YYYY')}</Regular>
                        <Regular style={{ marginVertical: 20 }}>{detail.overview}</Regular>
                        <Bold style={{ marginBottom: 10 }} size={18}>Cast</Bold>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginBottom: 35 }} >
                                {
                                    casts.map(el => (
                                        <View key={el.id} style={{ alignItems: 'center', width: 70, marginRight: 15 }}>
                                            <Image style={{ width: 70, marginBottom: 10, borderRadius: 50, height: 70 }} source={{ uri: `${IMG_URL}${el.profile_path}` }} />
                                            <Regular center size={12} >{el.name}</Regular>
                                        </View>
                                    ))
                                }
                            </View>
                        </ScrollView>
                        <MovieCardComponent navigation={navigation} loading={loading} data={similar} label="Similar Movies" labelSmall viewAllUrl="" />
                        <View style={{ height: 50 }} />
                    </View>
                </ScrollView>
            }
        </View >
    )
}