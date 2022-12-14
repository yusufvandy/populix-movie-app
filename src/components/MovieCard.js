import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { IMG_URL } from "@env"

const Skeleton = () => (
    <View style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Placeholder width="40%" Animation={Fade}>
                <PlaceholderLine style={{ height: 30, backgroundColor: '#444' }} />
            </Placeholder>
            <Placeholder width="20%" Animation={Fade}>
                <PlaceholderLine style={{ height: 30, backgroundColor: '#444' }} />
            </Placeholder>
        </View>
        <View style={{ flexDirection: 'row' }}>
            {
                [...Array(4)].map((v, i) =>
                    <Placeholder key={i} width="40%" style={{ marginRight: 15 }} Animation={Fade}>
                        <PlaceholderLine style={{ height: 220, backgroundColor: '#444' }} />
                        <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                        <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} width={50} />
                    </Placeholder>
                )
            }
        </View >
    </View >
)

const renderItem = ({ item }, navigation) => (
    <TouchableOpacity
        onPress={() => navigation.push('MOVIE_DETAIL_SCREEN', { id: item.id, title: item.title ? item.title : item.name })}
        key={item.id}
        style={{ width: 150, marginRight: 15, marginBottom: 15 }}>
        <Image style={{ width: '100%', borderRadius: 5, height: 220 }} source={{ uri: `${IMG_URL}${item.poster_path}` }} />
        <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2, top: 5, right: 5 }}>
            <AntDesign name="star" color="#f9bd2a" size={10} />
            <Regular color="#f9bd2a" style={{ marginLeft: 5 }}>{item.vote_average.toFixed(2)}</Regular>
        </View>
        <Bold style={{ marginTop: 10, marginBottom: 3, maxHeight: 40 }}>{item.title ? item.title : item.name}</Bold>
        <Regular size={12} color="#888">{moment(item.release_date).format('DD MMM YYYY')}</Regular>
    </TouchableOpacity>
)

export default MovieCardComponent = ({ loading, data, label, navigation, labelSmall, allData }) => {
    if (loading) return <Skeleton />
    if (!data || !data.length) return null
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Bold size={labelSmall ? 18 : 20}>{label}</Bold>
                {
                    allData &&
                    <TouchableOpacity onPress={() => navigation.push('MOVIE_LIST_SCREEN', { data: allData, label: label, withBack: true })}
                    >
                        <Regular color="#0cc1cf">View All</Regular>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={item => item?.id}
                    renderItem={(item) => renderItem(item, navigation)}
                />
            </View>
        </>
    )
}