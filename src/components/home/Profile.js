import React from 'react';
import { View } from 'react-native';
import { Regular, Semibold, Bold } from '@components/Text';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

const Skeleton = () => (
    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
        <Placeholder width='20%' Animation={Fade}>
            <PlaceholderLine style={{ height: 60, borderRadius: 100, backgroundColor: '#444' }} width={80} />
        </Placeholder>
        <Placeholder width='80%' Animation={Fade}>
            <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
            <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} width={30} />
        </Placeholder>
    </View >
)

export default ProfileComponent = ({ loading, token }) => {
    if (loading) return <Skeleton />
    if (!token) return (
        <Regular>not loggedn</Regular>
    )
    return (
        <Regular>loggedin</Regular>
    )
}