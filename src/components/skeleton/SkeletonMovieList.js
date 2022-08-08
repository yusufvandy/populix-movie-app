import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

export default SkeletonMovieList = () => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10 }}>
            <Placeholder Animation={Fade}>
                <PlaceholderLine style={{ height: 30, margin: 10, marginBottom: 25, backgroundColor: '#444' }} width="60%" />
            </Placeholder>
            {[...Array(6)].map((v, i) =>
                <Placeholder key={i} width="45%" style={{ marginHorizontal: 10 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 220, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} width={50} />
                </Placeholder>
            )}
        </View>
    )
}