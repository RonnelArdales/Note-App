import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from 'react-native-elements/dist/header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddNoteScreen from '../screens/Add';
import EditNoteScreen from '../screens/Edit';
import NoteListScreen from '../screens/List';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/register';

import { NoteStackParamlist } from '../types';


const Stack = createNativeStackNavigator<NoteStackParamlist>();

export default function TaskNavigator() {
  return (
    <Stack.Navigator 
    screenOptions={

      ({navigation}) => ({ 
      headerLeft:()=> (

        <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        >
          
        </TouchableOpacity>

      )
    })}>
     {/* <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/> */}
      {/* <Stack.Screen name='Register' component={RegisterScreen}  options={{headerTitleAlign:"center"}}/> */}
      <Stack.Screen name="List"  
      component={NoteListScreen}  
      options={{headerShown:true, 
      headerTitleAlign:'center', 
      title:"Note App", 
      headerTitleStyle:{fontSize:28},
      headerTintColor:"white",
      contentStyle:{shadowColor:"transparent", },
      headerStyle: {
      backgroundColor:"#0066ff", 
    }
      
      }}/>

      <Stack.Screen name="Add" 
      component={AddNoteScreen} 
      options={{headerTitleAlign:"center", 
      headerShown:true, 
      title:"Add note",
      headerTintColor:"white",
      headerTitleStyle:{fontSize:28},
      contentStyle:{shadowColor:"transparent", },
      headerStyle: {
      backgroundColor:"#0066ff", 
    }
    }} 
      ></Stack.Screen>

      <Stack.Screen name="EditNote" 
      component={EditNoteScreen}  
      options={{headerTitleAlign:'center', 
      headerShown:true, 
      title:"Edit note",
      headerTintColor:"white",
      headerTitleStyle:{fontSize:28},
      contentStyle:{shadowColor:"transparent", },

      headerStyle: {
      backgroundColor:"#0066ff", 
    }
    }}/>
    </Stack.Navigator>
  );
}