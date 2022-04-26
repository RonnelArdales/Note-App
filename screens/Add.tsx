import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Alert, Dimensions, StyleSheet,  } from 'react-native';
import { FAB, TextInput} from 'react-native-paper'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button} from '@rneui/base'
import React, { useEffect, useState } from 'react';
import { string } from 'yup';
import { getData, storeData } from '../Database/Storedata';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddNoteScreen() {
  const navigation = useNavigation()
    const [Title,setTitle] = useState<string>("");
    const [Description,setDescription] = useState<string>("");
    const [Datetime,setDate] = useState<string>("");
    const submit = async (index:number) => {
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
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <TextInput 
      placeholder={'Title'}
      value={Title}
      onChangeText={setTitle}
      autoComplete={false}
      style={{backgroundColor:"ivory", marginHorizontal:6, fontSize:20,  height:50}}
      />

      <ScrollView>
      <TextInput 
      placeholder={'Type Here...'}
      value={Description}
      onChangeText={setDescription}
      autoComplete={false}
      multiline={true}
      style={{backgroundColor:"ivory",  borderWidth:0, fontSize:20, marginHorizontal:6, marginTop:5, }}
      activeUnderlineColor={'transparent'}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      underlineColor='transparent'
      
      />
</ScrollView>
<FAB  large icon={'check'} onPress={submit} style={{position:"absolute" , right:35, bottom:140, backgroundColor:"#0066ff"  }} />
<FAB  large icon={'close'} color={'white'}  onPress={() => { navigation.goBack('List')}} style={{position:"absolute" , right:35, bottom:70, backgroundColor:"red" }} />
    
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
