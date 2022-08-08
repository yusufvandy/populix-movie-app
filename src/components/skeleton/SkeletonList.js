import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

export default SkeletonList = () => {
    return (
        <View>
            <Placeholder Animation={Fade}>
                <PlaceholderLine style={{ height: 30, marginBottom: 10, marginBottom: 25, backgroundColor: '#444' }} width="60%" />
            </Placeholder>
            {[...Array(8)].map((v, i) =>
                <Placeholder key={i} Animation={Fade}>
                    <PlaceholderLine style={{ height: 95, backgroundColor: '#444', marginBottom: 15 }} />
                </Placeholder>
            )}
        </View>
    )
}