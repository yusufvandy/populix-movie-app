import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import SkeletonMovieList from '@components/skeleton/SkeletonMovieList';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { IMG_URL } from "@env"

const win = Dimensions.get('window');

const renderItem = ({ item }, navigation) => (
    <TouchableOpacity
        onPress={() => navigation.push('MOVIE_DETAIL_SCREEN', { id: item.id, title: item.title ? item.title : item.name })}
        key={item.id}
        style={{ width: win.width * .45, marginHorizontal: 5, marginBottom: 20 }}>
        <Image style={{ width: '100%', borderRadius: 5, height: 250 }} source={{ uri: `${IMG_URL}${item.poster_path}` }} />
        <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2, top: 5, right: 5 }}>
            <AntDesign name="star" color="#f9bd2a" size={10} />
            <Regular color="#f9bd2a" style={{ marginLeft: 5 }}>{item.vote_average.toFixed(2)}</Regular>
        </View>
        <Bold style={{ marginTop: 10, marginBottom: 3, maxHeight: 40 }}>{item.title ? item.title : item.name}</Bold>
        <Regular size={12} color="#888">{moment(item.release_date).format('DD MMM YYYY')}</Regular>
    </TouchableOpacity>
)

export default MovieListComponent = ({ loading, data, label, navigation, withBack, emptyLabel, emptyIcon }) => {
    if (loading) return <SkeletonMovieList />
    if (!data || !data.length) return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {
                    withBack &&
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 15 }}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={24} />
                    </TouchableOpacity>
                }
                <Bold size={20}>{label}</Bold>
            </View>
            <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', marginTop: 50 }}>
                <MaterialCommunityIcons name={emptyIcon} color='#ddd' size={80} />
                <Bold style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 15 }}>{emptyLabel.title}</Bold>
                <Regular style={{ textAlign: 'center', marginBottom: 5 }}>{emptyLabel.subtitle}</Regular>
            </View>
        </>
    )
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {
                    withBack &&
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 15 }}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={24} />
                    </TouchableOpacity>
                }
                <Bold size={20}>{label}</Bold>
            </View>
            <FlatList
                horizontal={false}
                numColumns={2}
                columnWrapperStyle={{ flexWrap: 'wrap', paddingTop: 5, marginHorizontal: -5 }}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={item => item?.id}
                renderItem={(item) => renderItem(item, navigation)}
            />
        </>
    )
}