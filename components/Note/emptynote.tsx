import { View, StyleSheet, TextInput, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


 export default function Emptynote() {
    return (
        <View style={{height:"90%", zIndex:-2}}>
        <View style={{alignSelf:"center", zIndex:-1, justifyContent:"center", marginVertical:"60%"  }}>
        <Image source={require ("../../assets/noteimage/cute(2).png")}
                              style={{
                                resizeMode:"stretch",
                                height:150,
                                width:150,
                                backgroundColor:"transparent",
                                alignSelf:"center",                        
                              }}                         
                              >
                              </Image>
 <Text style={{justifyContent:"center", alignSelf:"center", fontSize:25, fontWeight:"bold",}}>Empty</Text>
 </View>
    </View>

);
}

const style = StyleSheet.create({
container:{
    zIndex:-100,
    width:Dimensions.get('screen').width,

    
}
})
 