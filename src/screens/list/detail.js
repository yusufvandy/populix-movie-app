import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getListDetail } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import SkeletonListDetail from '@components/skeleton/SkeletonListDetail';
import { IMG_URL } from "@env"
import moment from 'moment';

export const ListDetail = ({ route, navigation }) => {
    const { loading, listDetail } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getListDetail({ id: route.params.id }))
        }
    }, [isFocused])

    if (loading) return <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}><SkeletonListDetail /></View >
    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 15 }}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={24} />
                    </TouchableOpacity>
                    <Bold size={20}>List Detail</Bold>
                </View>
                <TouchableOpacity>
                    <Regular color="#0cc1cf">Edit List</Regular>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 25 }}>
                <Bold size={20} style={{ marginBottom: 5, textTransform: 'capitalize' }}>{listDetail.name}</Bold>
                <Regular style={{ marginBottom: 20 }}>{listDetail.description}</Regular>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Bold color="#ddd" size={20}>{listDetail.results.length}</Bold>
                        <Regular color="#777" size={12}>Item on list</Regular>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Bold color="#ddd" size={20}>{listDetail.average_rating.toFixed(2)}%</Bold>
                        <Regular color="#777" size={12}>Average Ratings</Regular>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Regular color="#ddd" size={20}>{`${Math.trunc(listDetail.runtime / 60)}h ${listDetail.runtime % 60}m`}</Regular>
                        <Regular color="#777" size={12}>Total Runtime</Regular>
                    </View>
                </View>
            </View>
            <ScrollView>
                {
                    listDetail.results.length && listDetail.results.map(el => (
                        <View key={el.id} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Image style={{ width: 70, borderRadius: 5, height: 100, marginRight: 15 }} source={{ uri: `${IMG_URL}${el.poster_path}` }} />
                            <View>
                                <Bold size={18}>{el.title ? el.title : el.name}</Bold>
                                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                    <AntDesign name="star" color="#f9bd2a" size={10} style={{ marginRight: 5 }} />
                                    <Regular size={12}>{el.vote_average.toFixed(1)}</Regular>
                                    <Regular size={12} style={{ marginHorizontal: 10 }}>•</Regular>
                                    <Regular size={12}>{moment(el.release_date).format('DD MMM YYYY')}</Regular>
                                </View>
                                <TouchableOpacity style={{ marginTop: 25 }}>
                                    <Regular color="#ff8591" size={12}>Remove</Regular>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}