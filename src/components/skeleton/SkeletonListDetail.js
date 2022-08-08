import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

export default SkeletonListDetail = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Placeholder width="60%" Animation={Fade}>
                    <PlaceholderLine style={{ height: 30, marginBottom: 10, marginBottom: 25, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width="25%" Animation={Fade}>
                    <PlaceholderLine style={{ height: 30, marginBottom: 10, marginBottom: 25, backgroundColor: '#444' }} />
                </Placeholder>
            </View>
            <Placeholder Animation={Fade}>
                <PlaceholderLine style={{ height: 125, backgroundColor: '#444', marginBottom: 15 }} />
            </Placeholder>
            {[...Array(3)].map((v, i) =>
                <View key={i} style={{ flexDirection: 'row' }}>
                    <Placeholder width="23%" Animation={Fade}>
                        <PlaceholderLine width="85%" style={{ height: 100, backgroundColor: '#444', marginBottom: 15 }} />
                    </Placeholder>
                    <Placeholder width="60%" Animation={Fade}>
                        <PlaceholderLine style={{ height: 25, backgroundColor: '#444', marginBottom: 15 }} />
                        <PlaceholderLine width="70%" style={{ height: 20, backgroundColor: '#444', marginBottom: 15 }} />
                    </Placeholder>
                </View>
            )}
        </View>
    )
}