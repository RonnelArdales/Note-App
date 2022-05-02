import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Alert, Dimensions, Keyboard, StyleSheet,  } from 'react-native';
import { FAB, TextInput} from 'react-native-paper'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button} from '@rneui/base'
import React, { Fragment, useEffect, useState } from 'react';
import { string } from 'yup';
import { getData, storeData } from '../Database/Storedata';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function AddNoteScreen() {
  const navigation = useNavigation()
    const [Title,setTitle] = useState<string>("");
    const [Description,setDescription] = useState<string>("");
    const [Datetime,setDate] = useState<string>("");
    const submit = async (index:number) => {
        if (!Title){
            Alert.alert("Error", "Please Input a Title")
        }else{
            const addnote = await getData ('addnote');
            const data ={
                
                Title: Title,
                Description:Description,
                Datetime:Datetime
                
            }
            if (addnote){
         const json = JSON.parse(addnote)
        
            if (json){
            
                const jsonvalue = JSON.stringify([...json, data]);
                await storeData('addnote', jsonvalue )
                navigation.goBack('List')
              console.log(json)
            }
    
            }else{
                const jsonvalue = JSON.stringify([data]);
               await storeData('addnote', jsonvalue) 
            }
        }
    }
    
      useEffect(() => {
        var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = new Date().getDate()
        let Datemonth = monthNames[new Date().getMonth() + 1]
        let Dateyear = new Date().getFullYear()
        let Htime = new Date().getHours()  
        let Mtime = new Date().getMinutes()
        let prepend = Htime >= 12? "PM":"AM" 
        setDate( date + " " + Datemonth + ' ' + Dateyear + ' ' + Htime + ':' + Mtime + ' ' + prepend  )
      },[])

    return (
      <View style={{height:"100%", backgroundColor:"lightblue"}} >
        <View style={{height:95, backgroundColor:"#0066ff", flexDirection:"row", justifyContent:"space-between",}}>
          <AntDesign name="arrowleft" color={"white"} size={28} style={{marginTop:54, marginLeft:18}} onPress={() => {navigation.goBack()}} />
          <Text style={{color:"white", fontSize:25, fontWeight:"bold", alignSelf:"center", marginTop:40,  marginLeft:7}}>Add Note</Text>  
          <View style={{width:50, padding:0, backgroundColor:"#0066ff",}}>
          {Title.length > 0  || Description.length > 0 ? (<Ionicons name="checkmark-outline" size={28} color={"white"} style={{ alignSelf:"center",  marginTop:54, marginRight:18}} onPress={submit} />  ) : null }
          </View>
        </View>
      <ScrollView>
    <View style ={{flex:1, backgroundColor:"lightblue", marginBottom:15}}>
    <View style={{  paddingLeft: 20, paddingRight: 20, backgroundColor:"lightblue"}}>
          <TextInput
            mode="flat"
            numberOfLines={2}
            style={{    height: 50,
              fontSize: 19,
              borderColor: "black",
              borderRadius: 20,
              marginVertical:20,
              marginTop:30,
              borderWidth: 1,
              backgroundColor:"ivory", 
              textAlign: "left",}}
            placeholder="Title"
            placeholderTextColor="#AFAFB0"
            theme={{
              roundness: 20,
            }}
            value={Title}
            onChangeText={setTitle}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor="lightblue"
            autoComplete={false}
          />

<View style={{ }}></View>
          <TextInput
            mode="flat"
            multiline={true}
            numberOfLines={5}
            style={{    minHeight:500 ,
              fontSize: 19,
              borderColor:"black",
              borderRadius: 9,
              borderWidth: 1,
              backgroundColor:"ivory", }}
            placeholder="Type here....."
            placeholderTextColor="#AFAFB0"
            theme={{
              roundness: 9,
            }}
            value={Description}
            onChangeText={setDescription}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor="#005CEA"
            textAlignVertical="top"
            autoComplete={false}
          />
        </View>
        
        </View>
       
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    height:Dimensions.get('window').height - 40,
    zIndex:-1,
    backgroundColor:"ivory", 

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
