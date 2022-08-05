import React from 'react';
import { View, Dimensions } from 'react-native';
import { Regular, Semibold } from '@components/Text';

export const Favorite = () => {
    const win = Dimensions.get('window');

    return (
        <View style={{ backgroundColor: "#1f1d2b", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ height: win.height * .3, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Semibold style={{ fontSize: 18, textAlign: 'center', marginBottom: 5 }}>Favorite Screen</Semibold>
            </View>
        </View>
    )
}