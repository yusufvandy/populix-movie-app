import React from 'react';
import { View, Dimensions } from 'react-native';
import { Regular, Semibold } from '@components/Text';

export const Watchlist = () => {
    const win = Dimensions.get('window');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <View style={{ height: win.height * .3, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Semibold style={{ fontSize: 18, textAlign: 'center', marginBottom: 5 }}>Watchlist Screen</Semibold>
            </View>
        </View>
    )
}