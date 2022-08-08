import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postList, putList, deleteList } from '@features/profileSlicer';
import { useIsFocused } from '@react-navigation/native';

export const ListForm = ({ route, navigation }) => {
    const [form, setForm] = React.useState({ name: '', description: '', iso_639_1: 'en' });
    const { loading } = useSelector(state => state.profile);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            if (route.params !== undefined) { setForm({ ...form, name: route.params.name, description: route.params.description }) }
        }
    }, [isFocused])

    const handleSubmitForm = () => {
        if (route.params === undefined) return dispatch(postList(form)).then(() => navigation.goBack())
        dispatch(putList({ form: form, id: route.params.id })).then(() => navigation.goBack())
    }

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 15 }}>
                        <Ionicons color="white" name={"md-arrow-back-outline"} size={24} />
                    </TouchableOpacity>
                    <Bold size={20}>{route.params === undefined ? "Add List" : "Edit List"}</Bold>
                </View>
                {
                    route.params !== undefined &&
                    <TouchableOpacity onPress={() => dispatch(deleteList({ id: route.params.id })).then(() => navigation.navigate('LIST_SCREEN_TAB'))}>
                        <Regular color="#ff8591">Delete List</Regular>
                    </TouchableOpacity>
                }
            </View>
            <View>
                <Regular style={{ marginBottom: 10 }}>Name</Regular>
                <TextInput
                    defaultValue={form.name}
                    onChangeText={val => setForm({ ...form, name: val })}
                    style={{ backgroundColor: '#312e42', marginBottom: 20, color: '#ddd', padding: 10, paddingHorizontal: 15, borderRadius: 5 }} />
                <Regular style={{ marginBottom: 10 }}>Description</Regular>
                <TextInput
                    multiline
                    defaultValue={form.description}
                    onChangeText={val => setForm({ ...form, description: val })}
                    style={{ backgroundColor: '#312e42', textAlignVertical: 'top', height: 100, marginBottom: 30, color: '#ddd', padding: 15, borderRadius: 5 }} />
                <TouchableOpacity onPress={() => handleSubmitForm()} disabled={!form.name || loading} style={{ backgroundColor: form.name || loading ? '#0cc1cf' : '#6d6d7d', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                    <Semibold color="#111">Submit</Semibold>
                </TouchableOpacity>
            </View>
        </View>
    )
}