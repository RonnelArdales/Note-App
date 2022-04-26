import { RouteProp, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { Alert, Dimensions, StyleSheet,  } from 'react-native';
import { FAB, TextInput} from 'react-native-paper'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { NoteStackParamlist, RootTabScreenProps } from '../types';
import { Button} from '@rneui/base'
import React, { useEffect, useState } from 'react';
import { string } from 'yup';
import { getData, storeData } from '../Database/Storedata';
import { ScrollView } from 'react-native-gesture-handler';

type Iroute = {
  "params": NoteStackParamlist ['EditNote'];
}

export default function EditNoteScreen() {
  const route = useRoute<RouteProp<Iroute, "params">>();
  const note =  route.params.note;
  const index = route.params.index

  const navigation = useNavigation()
    const [Title,setTitle] = useState<string>(note.Title);
    const [Description,setDescription] = useState<string>(note.Description);
    const [Datetime,setDate] = useState<string>("");
    const submit = async () => {
        if (!Title){
            Alert.alert("Error", "Please Input a task")
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

              json[index] = {...data}
            
                const jsonvalue = JSON.stringify([...json]);
                await storeData('addnote', jsonvalue )
                navigation.goBack('List')
              console.log(json)
            }
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
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>

      <Text style={{alignSelf:"flex-end", marginBottom:5}}>{note.Datetime}</Text>
      <TextInput 
      placeholder={'Title'}
      value={Title}
      onChangeText={setTitle}
      autoComplete={false}
      style={{backgroundColor:"ivory", marginHorizontal:6, fontSize:20,  height:50}}
      defaultValue={Title}
      
      />
      <ScrollView>
      <TextInput 
      placeholder={'Type Here...'}
      value={Description}
      onChangeText={setDescription}
      autoComplete={false}
      multiline={true}
      
      style={{backgroundColor:"ivory",  borderWidth:0, fontSize:20, marginHorizontal:6, marginTop:5,}}
      activeUnderlineColor={'transparent'}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      underlineColor='transparent'
      defaultValue={Description}
      
      />
</ScrollView>
{note.Title != Title || note.Description != Description ? (<FAB  large icon={'check'} onPress={submit} style={{position:"absolute" , right:35, bottom:80, backgroundColor:"#0066ff"  }} />) : null}

{/* {Title.trim().length == setTitle  ? (  )  :} */}
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