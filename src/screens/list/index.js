import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';
import SkeletonList from '@components/skeleton/SkeletonList';

export const List = ({ navigation }) => {
    const { loading, list } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            dispatch(getList())
        }
    }, [isFocused])

    if (loading) return <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}><SkeletonList /></View >
    if (!list || !list.length) return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name='format-list-bulleted' color='#ddd' size={80} />
            <Bold style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 15 }}>No List</Bold>
            <TouchableOpacity>
                <Regular style={{ textAlign: 'center', marginBottom: 5 }}>You don't have any movie list. </Regular>
                <Regular><Regular color="#0cc1cf">Create new</Regular> list and add items to your movie list</Regular>
            </TouchableOpacity>
        </View>
    )
    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                <Bold size={20}>Your Movie List</Bold>
                <TouchableOpacity>
                    <Regular color="#0cc1cf">Add List</Regular>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    list.map(el => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LIST_DETAIL_SCREEN', { id: el.id })}
                            style={{ backgroundColor: '#312e42', padding: 10, marginBottom: 15, paddingHorizontal: 15, borderRadius: 5 }} key={el.id}>
                            <Bold size={20} style={{ marginBottom: 5, textTransform: 'capitalize' }}>{el.name}</Bold>
                            <Regular style={{ marginBottom: 20 }}>{el.description}</Regular>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Bold color="#ddd" size={20}>{el.number_of_items}</Bold>
                                    <Regular color="#777" size={12}>Item on list</Regular>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Bold color="#ddd" size={20}>{el.average_rating.toFixed(2)}%</Bold>
                                    <Regular color="#777" size={12}>Average Ratings</Regular>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Regular color="#ddd" size={20}>{`${Math.trunc(el.runtime / 60)}h ${el.runtime % 60}m`}</Regular>
                                    <Regular color="#777" size={12}>Total Runtime</Regular>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}