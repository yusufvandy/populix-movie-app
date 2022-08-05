import React from 'react';
import { Text } from 'react-native';

export const Regular = (props) => {
    return (
        <Text {...props} style={[{ fontFamily: 'Poppins-Regular', color: props.color ? props.color : '#4d4d4d', textAlign: props.align ? props.align : 'left', fontSize: props.size ? props.size : 14 }, props.style]}>{props.children}</Text>
    )
}

export const Semibold = (props) => {
    return (
        <Text {...props} style={[{ fontFamily: 'Poppins-Medium', color: props.color ? props.color : '#4d4d4d', textAlign: props.align ? props.align : 'left', fontSize: props.size ? props.size : 14 }, props.style]}>{props.children}</Text>
    )
}

export const Bold = (props) => {
    return (
        <Text {...props} style={[{ fontFamily: 'Poppins-Bold', color: props.color ? props.color : '#4d4d4d', textAlign: props.align ? props.align : 'left', fontSize: props.size ? props.size : 14 }, props.style]}>{props.children}</Text>
    )
}