import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Regular, Semibold, Bold } from '@components/Text';

export default Header = ({ color, back, navigation, title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', width: '100%', top: 0, borderBottomWidth: 1, borderBottomColor: '#fff', backgroundColor: color ? color : '#1f1d2b' }}>
            {
                back &&
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 15 }}>
                    <Ionicons color="white" name={"md-arrow-back-outline"} size={24} />
                </TouchableOpacity>
            }
            <Semibold color="white" size={18}>{title.length > 30 ? `${title.substring(0, 30)}...` : title}</Semibold>
        </View>
    )
}