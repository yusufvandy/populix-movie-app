import React from 'react';
import { View, Dimensions, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import SkeletonDetail from '@components/movie/SkeletonDetail';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail, getCredits } from '@features/movieSlicer';
import { useIsFocused } from '@react-navigation/native';
import { IMG_URL } from "@env"
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export const MovieDetail = ({ route, navigation }) => {
    const win = Dimensions.get('window');
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { loading, detail, casts } = useSelector(state => state.movie);

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getMovieDetail(route.params.id))
            dispatch(getCredits(route.params.id))
        }
    }, [])

    // React.useEffect(() => {
    //     console.log("casts ", JSON.stringify(casts, null, 2));
    // }, [casts])

    if (loading) return <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}><SkeletonDetail /></View>
    return (
        <View style={{ flex: 1, backgroundColor: '#1f1d2b' }}>
            {
                detail &&
                <>
                    <TouchableOpacity style={{ position: 'absolute', top: 20, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 5, zIndex: 99 }} onPress={() => navigation.goBack()}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={20} />
                    </TouchableOpacity>
                    <Image style={{ width: win.width, marginTop: 10, height: 220 }} source={{ uri: `${IMG_URL}${detail.backdrop_path}` }} />
                    <LinearGradient
                        // Background Linear Gradient
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -10 }}>
                                <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                                    <AntDesign name="hearto" size={20} color='#ddd' />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                                    <MaterialIcons name="bookmark-outline" color='#ddd' size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Bold style={{ marginBottom: 6 }} size={24}>{detail.title}</Bold>
                        <Regular>{detail.genres.map((el, i) => <Regular key={i}>{el.name}, </Regular>)} • {moment(detail.release_date).format('DD MMM YYYY')}</Regular>
                        <Regular style={{ marginVertical: 20 }}>{detail.overview}</Regular>
                        <Bold style={{ marginBottom: 10 }} size={16}>Cast</Bold>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }} >
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
                    </View>
                </>
            }
        </View >
    )
}