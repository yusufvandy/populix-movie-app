import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

export default SkeletonDetail = () => {
    return (
        <>
            <Placeholder width='100%' Animation={Fade}>
                <PlaceholderLine style={{ height: 220, marginTop: 10, marginBottom: 20, backgroundColor: '#444' }} />
            </Placeholder>
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                <Placeholder width='40%' Animation={Fade}>
                    <PlaceholderLine style={{ height: 25, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width='20%' Animation={Fade}>
                    <PlaceholderLine style={{ height: 25, backgroundColor: '#444' }} />
                </Placeholder>
            </View >
            <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                <Placeholder width='80%' Animation={Fade}>
                    <PlaceholderLine style={{ height: 25, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 18, backgroundColor: '#444' }} width={40} />
                </Placeholder>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine style={{ height: 18, backgroundColor: '#444' }} width={100} />
                    <PlaceholderLine style={{ height: 18, backgroundColor: '#444' }} width={85} />
                    <PlaceholderLine style={{ height: 18, backgroundColor: '#444' }} width={95} />
                    <PlaceholderLine style={{ height: 18, backgroundColor: '#444' }} width={70} />
                </Placeholder>
            </View>
            <Placeholder style={{ paddingHorizontal: 15, marginTop: 20, marginBottom: 10 }} Animation={Fade}>
                <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} width={20} />
            </Placeholder>
            <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Placeholder width='19%' style={{ marginRight: 15 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 70, borderRadius: 100, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width='19%' style={{ marginRight: 15 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 70, borderRadius: 100, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width='19%' style={{ marginRight: 15 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 70, borderRadius: 100, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width='19%' style={{ marginRight: 15 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 70, borderRadius: 100, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                </Placeholder>
                <Placeholder width='19%' style={{ marginRight: 15 }} Animation={Fade}>
                    <PlaceholderLine style={{ height: 70, borderRadius: 100, backgroundColor: '#444' }} />
                    <PlaceholderLine style={{ height: 20, backgroundColor: '#444' }} />
                </Placeholder>
            </View>
        </>
    )
}