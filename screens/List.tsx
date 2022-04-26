import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { ListItem } from 'react-native-elements';
import React, { Fragment, useCallback, useState } from 'react';
import { Alert, Button, Dimensions, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getData, storeData } from '../Database/Storedata';
import { note } from '../Models/Note';
import { NoteStackParamlist } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchBar from '../components/Note/Searchbar';
import NoTFound from '../components/Note/NotFound';
import Removelist from '../components/Note/Disabled';
import { FAB } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';




export default function NoteListScreen() {
    const navigation = useNavigation()
    const [loading, setLoading,] = useState<boolean>(false)
    const [notelist, setNotelist]= useState<Array<note> | null >();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultnotfound, setResultNotDFound] = useState(false);

 
  //   const sorted = ()=>{ notelist?.sort((a,b)=>{
  //     const dateA = new Date(`${a.Datetime}`).valueOf();
  //     const dateB = new Date(`${b.Datetime}`).valueOf();
  //     if(dateA > dateB){
  //       return 1; // return -1 here for DESC order
  //     }
  //     return -1 // return 1 here for DESC Order
  //   });
  // }


  
    const retrieveData = async () => {
        setLoading(true)
        const addnote = await getData ('addnote');
        if (addnote){
                const json = JSON.parse(addnote);
                setNotelist(json)
        
        }else{
            setNotelist(null);
        }
        setLoading(false)
    }

    const updatetask = async () =>{

        const jsonvalue = JSON.stringify(notelist);
        await storeData('addnote', jsonvalue)
        retrieveData();
       
    }
  
    const deletetask =(index: number) =>{
        if (notelist){
            Alert.alert("Delete", "Do you really want to delete this task",
                [{
                    text: "Yes",
                    style:"destructive",
                    onPress: ()=>{
                 
                  
                      notelist.splice (index, 1);
                        updatetask();
               
                        
                    }
                },
                {
                    text: "No",
                    style:"default",
                    onPress: ()=>{}
                }
            ]
            )
        }
    }



    const handleOnSearchInput = async TEXT =>{
      setSearchQuery(TEXT);
      if(!TEXT.trim()){
          setSearchQuery('');
          retrieveData()
          setResultNotDFound(false)
      }
      const filteredtask =  notelist?.filter(note  => {
          if(note.Title.toLocaleLowerCase().includes(TEXT.toLocaleLowerCase())){
              return notelist;
        
          }
      })

      if(filteredtask.length){
          setNotelist([...filteredtask])
      }else{
          setResultNotDFound(true)
      }
    }


    useFocusEffect(
        useCallback(() => {
            retrieveData(); 

        }, []) 
      );

const handleonclear = () => {
  setSearchQuery('')
  retrieveData()
  setResultNotDFound(false)
}


  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      

      {!notelist?.length ? 
          <View style={[{flex:1, height:"100%", backgroundColor:"lightblue", justifyContent:"center", alignItems:"center",}, StyleSheet.absoluteFillObject]}>
            <Text style ={{ fontSize:30, fontWeight:"bold", bottom:60}}>Notes will Appear here</Text>

          </View>  
        :null
        }


{notelist?.length ?(
            <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} onclear={handleonclear} />
        ):  null
        }
  
        {resultnotfound ? <NoTFound/> :
        
        <ScrollView>
        <Fragment>
            {notelist?.map((NOTE:note, Index:number) =>( 
            <ListItem    onPress={()  => {navigation.navigate("Main" , {
              screen: "EditNote",
              params: {note:NOTE, index:Index}
            })}}
                 key={Index -1}
                  bottomDivider
                containerStyle={{
                  backgroundColor:"ivory", 
                  borderRadius:15, 
                  
                  padding:10,
                  paddingVertical:12,
                  flexShrink:1
                }}
                style={{marginHorizontal:10,  
                  borderRadius:15,  
                  padding:0, 
                  marginVertical:4 }}
                  >  

            <ListItem.Content style={styles.listitemcontainer}>
              <ListItem.Title numberOfLines={1} style ={{ fontSize:18, fontWeight:"bold", width:"100%"}}>{NOTE.Title}</ListItem.Title>
              <ListItem.Subtitle  numberOfLines={1} style={{ fontSize:18,marginVertical:1  , width:"100%"}}>{NOTE.Description ? NOTE.Description :  <Removelist/> }</ListItem.Subtitle>
              <ListItem.Subtitle style={{ fontSize:13, marginTop:1}}>{NOTE.Datetime}</ListItem.Subtitle>
            </ListItem.Content>
            <Ionicons name = 'trash-outline' 
                      style={{
                              paddingRight:0, 
                              width:28,
                              marginRight:8           }} 
                      size={25} 
                      color={"gray"} 
                      onPress={ () => {deletetask(Index)}} > </Ionicons>
          </ListItem>
            ) )}
        
        </Fragment>
        </ScrollView>     
          }


         
<FAB label='add note'  small icon={'plus'} onPress={() => {navigation.navigate('Add')}} style={{position:"absolute" , alignSelf:"center", bottom:20, backgroundColor:"#0066ff" }}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"lightblue",
    height:Dimensions.get('window').height - 56,
    zIndex:-1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listitemcontainer:{

      marginLeft:10,
      flexShrink:1
  }
});
