import React from 'react';
import { View, Dimensions } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export const Home = () => {
    const win = Dimensions.get('window');

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        //     <View style={{ height: win.height * .3, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        //         <Bold style={{ fontSize: 18, textAlign: 'center', marginBottom: 5 }}>Home Screen mansd</Bold>
        //     </View>
        // </View>
        <View style={{ padding: 15 }}>
            <Placeholder
                Animation={Fade}
                Left={PlaceholderMedia}
            >
                <PlaceholderLine
                    style={{ height: 20 }} />
                <PlaceholderLine width={30} />
            </Placeholder>
        </View>
    )
}