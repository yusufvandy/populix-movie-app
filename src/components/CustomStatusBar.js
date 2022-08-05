import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';

export default CustomStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ height: StatusBar.currentHeight, backgroundColor }}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View >
    )
}