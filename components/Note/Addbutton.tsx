import { View, StyleSheet,  } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';

const RoundButton = ({ anticonname, size, color, style}) => {
    return(
<AntDesign

name={anticonname}
size={size || 24}
style={[styles.icon, {...style}]}
    
/>
    )
}
export default RoundButton

const styles = StyleSheet.create({
icon:{
padding:15,
borderRadius:50,
elevation:5,
backgroundColor:"#0066ff"
    
}

})