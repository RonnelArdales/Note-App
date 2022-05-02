import { View, StyleSheet, TextInput, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


 export default function Emptynote() {
    return (
        <View style={{height:"90%", zIndex:-2}}>
        <View style={{alignSelf:"center", borderColor:"black", borderWidth:1, zIndex:-1, justifyContent:"center", top:240   }}>
        <Image source={require ("../../assets/noteimage/cute(2).png")}
                              style={{
                                resizeMode:"stretch",
                                height:160,
                                width:160,
                                backgroundColor:"transparent",
                                alignSelf:"center",                        
                              }}                         
                              >
                              </Image>
 <Text style={{justifyContent:"center", fontSize:25, fontWeight:"bold", marginTop:16}}> NO NOTE YET... </Text>
 </View>
    </View>

);
}

const style = StyleSheet.create({
container:{
    zIndex:-1,
    width:Dimensions.get('screen').width,

    
}
})
 