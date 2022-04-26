import { View, StyleSheet,  } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';


 const SearchBar = ({  value, onChangeText}) => {
    return(
        <View style={style.container}>
       
            <TextInput
            value={value}
            onChangeText={onChangeText} 
            placeholder='Search notes' 
            style={style.searchbar}
       underlineColor={"transparent"}
       activeUnderlineColor={"transparent"}
            autoCorrect={false}
            >
         </TextInput>
        </View>
    
    )
}
export default SearchBar

const style=StyleSheet.create({
container:{
backgroundColor:"transparent"
},
searchbar:{
    
    borderWidth:0.5,
    borderColor:colors.primary,
    height:50,
    borderRadius:30,
    borderTopStartRadius:30,
    borderTopEndRadius:30,
    paddingLeft:15,
    fontSize:20,
    marginVertical:7,
    marginHorizontal:15,
    backgroundColor:"white",
    flexDirection:"column"
    
}

})