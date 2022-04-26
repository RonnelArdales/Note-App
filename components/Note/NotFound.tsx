import { View, StyleSheet, TextInput, Text, Dimensions, Image } from 'react-native';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';


 export default function NoTFound() {
    return (
        <View style={[  style.container]}>
            <View style={{ alignSelf:"center", justifyContent:"center", marginBottom:50, height:200, width:200}}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5058/5058432.png' }}
                                  style={{
                                    resizeMode:"cover",
                                    height:100,
                                    width:100,
                                    marginTop:0,
                                    backgroundColor:"transparent",
                                 alignSelf:"center"
                                  }}
                                  >
                                  </Image>
     <Text style={{justifyContent:"center", fontSize:25, fontWeight:"bold", marginBottom:20}}> Note not Found </Text>
     </View>
        </View>

    );
}

const style = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        zIndex:1,
        flex:1,
        marginTop:51,
        height:620,
        width:Dimensions.get('screen').width,
        position:"absolute",
  
        
    }
})