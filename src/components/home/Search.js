import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { useDispatch } from 'react-redux';
import { searchMovie } from '@features/movieSlicer';

const Skeleton = () => (
    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
        <Placeholder width='70%' Animation={Fade}>
            <PlaceholderLine style={{ height: 40, backgroundColor: '#444' }} width={95} />
        </Placeholder>
        <Placeholder width='50%' Animation={Fade}>
            <PlaceholderLine style={{ height: 40, backgroundColor: '#444' }} />
        </Placeholder>
    </View >
)

export default SearchComponent = ({ navigation, loading }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = React.useState('');

    const handleSearch = () => {
        dispatch(searchMovie({ query: query }))
            .then(() => navigation.push('MOVIE_LIST_SCREEN', { type: 'search' }))
    }

    if (loading) return <Skeleton />
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 15, alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput
                defaultValue={query}
                onChangeText={val => setQuery(val)}
                style={{ width: '70%', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, backgroundColor: '#fff' }}
                placeholder="Find movie, TV or people..."
                placeholderTextColor={"#888"}
            />
            <TouchableOpacity onPress={() => handleSearch()} style={{ width: '25%', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, backgroundColor: '#0cc1cf' }}>
                <Semibold center color="#fff">Search</Semibold>
            </TouchableOpacity>
        </View>
    )
}