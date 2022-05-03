import { View, StyleSheet, TextInput, Text, Dimensions, Image } from 'react-native';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';


 export default function NoTFound() {
    return (
        <View style={[  style.container]}>
            <View style={{ alignSelf:"center", marginVertical:"50%"}}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5058/5058432.png' }}
                                  style={{
                                    resizeMode:"cover",
                                    height:120,
                                    width:120,
                                    marginLeft:15,
                                    backgroundColor:"transparent",
                                 alignSelf:"center"
                                  }}
                                  >
                                  </Image>
     <Text style={{alignSelf:"center", fontSize:25, fontWeight:"bold", marginTop:15,}}> Note not Found </Text>
     </View>
        </View>

    );
}

const style = StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height - 210,
        
    }
})