import React, { Fragment, useState } from 'react';
import { Alert, AsyncStorage, Dimensions, Image, ImageBackground, ScrollView, StyleSheet,   TouchableOpacity } from 'react-native';
import { Button, CheckBox, colors,  } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ViewWithLoading from '../components/ViewWithLoading';
import * as yup from "yup";

export default function RegisterScreen() {

const [visible, setvisible] = useState(true);
const [loading, setLoading]= useState(true);
const [check1, setCheck1] = useState(false);
const [Name, Setname] = useState('');
const [ Lastname, setLastname] = useState('');
const [ Email, setEmail] = useState ('');
const [ Password, setPassword ] = useState('')


const loginschema = yup.object({
fname: yup.string().required('First name is required'),
lname: yup.string().required('Last name is required'),
email: yup.string().required('Email address is required')
.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, 'Invalid email address'),
password: yup.string().required('Password is required')
.min(8, 'Minimun of 8 letters'),
repassword: yup.string().required('Password is required')
.oneOf([yup.ref('password'), null], 'Confirm password does not match')
}); 

  setTimeout(() => {
    setLoading(false); 
  }, 1000);


const handlersubmit = async () => {
        if(loginschema){
          Alert.alert("Error", "Signup Unsuccessfully")
        }else{
          try{
            var user = {
          Name:fname,
          Lastname:Lastname,
          Email:Email,
          Password:Password
            };
            await AsyncStorage.setItem('Userdata', JSON.stringify(user))
          }catch(error){
              console.warn(error)

          }
        }
}



  return (
      
<ScrollView contentContainerStyle={{
 flexGrow:1
}}>
<View style={{flex:1, height:850, width:'100%', backgroundColor:'white'}}>
  <View style={ styles.container1}>
    <Image
                      source={{ uri: 'https://scontent.fmnl11-1.fna.fbcdn.net/v/t1.15752-9/275616101_486852396320819_6296659550059139399_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeE5VpzN_dJYlz_NE238Aw220kxN8jOpC2XSTE3yM6kLZUOqCf_rNtjNzt6WxYFhx8SIzvU67fTKWozdkPPfMyH5&_nc_ohc=gCpqFHoa97IAX_AYtsr&_nc_ht=scontent.fmnl11-1.fna&oh=03_AVIunjAnAA4DahEDeYQvUx6jxVPJhKoeXsO2iQlYQKEBnQ&oe=6266B313' }}
                      style={styles.logo }
                    >
                      </Image>
                      <View style={styles.container3}>
                      <Text style={styles.registercontainer}>
    Sign Up
    </Text>
   <Text style={styles.newaccountcontainer}>
     Create a new Acount
   </Text>
                      </View>

<View style={styles.container2}>
<Formik initialValues={{
                      fname:'',
                      lname:'',
                      email:'',
                      password:'',
                      repassword:''
                    }}
                    onSubmit={(values, action) =>{
                    
                    }}
                    validationSchema={loginschema}

                    >
                    {({values, handleChange, handleSubmit, errors, touched}) => (
                        <Fragment>

                          <View style={styles.firstlastnamecontainer}>
                     <View style={styles.custominputext1}>
                     
                     <TextInput
                     label={'FIRST NAME'}
                     placeholder={'FIRST NAME'}
                     placeholderTextColor={'#bbbbbb'}
                     value={values.fname}
                     autoComplete={false}
                     style={styles.textinputstyle}
                     mode="flat"
                     autoFocus={true}
                     onChangeText={handleChange('fname')}
                     error={errors.fname ? true : false}
                     />
                     {errors.fname && 
                   <Text style={{ color:'red'}}>
                     {errors.fname}
                   </Text>
                     }
                     </View>
                     <View style={styles.custominputext1}>
                          <TextInput
                       label={'LAST NAME'}
                       placeholder={'LAST NAME'}
                       placeholderTextColor={'#bbbbbb'}
                       value={values.lname}
                       autoComplete={false}
                       style={styles.textinputstyle}
                       mode="flat"
                        error={errors.lname ? true : false}
                          onChangeText={handleChange('lname')}
                          />
                          {errors.lname && 
                            <Text style={{ color:'red'}}>
                              {errors.lname}
                            </Text>}
                      </View>
                      </View>
                      
                      <View style={styles.custominputext}>
                      <TextInput
                       label={'EMAIL ADDRESS'}
                       placeholder={'EMAIL ADDRESS'}
                       placeholderTextColor={'#bbbbbb'}
                       value={values.email}
                       autoComplete={false}
                       style={styles.textinputstyle}
                       mode="flat"
                        error={errors.email ? true : false}
                          onChangeText={handleChange('email')}
                          />
                            {errors.email && 
                            <Text style={{ color:'red'}}>
                              {errors.email}
                              
                            </Text>}
                      </View>

                      <View style={styles.custominputext}>
                      <TextInput
                       label={'PASSWORD'}
                       placeholder={'PASSWORD'}
                       placeholderTextColor={'#bbbbbb'}
                       value={values.password}
                       autoComplete={false}
                       style={styles.textinputstyle}
                       mode="flat"
                    error={errors.password ? true : false}
                      onChangeText={handleChange('password')}
                      secureTextEntry={visible}
                      />
                        {errors.password && 
                        <Text style={{ color:'red'}}>
                          {errors.password}
                        </Text>}
                      </View>

                      <View style={styles.custominputext}>
                      <TextInput
                        label={'CONFIRM PASSWORD'}
                       placeholder={'CONFIRM PASSWORD'}
                       placeholderTextColor={'#bbbbbb'}
                       value={values.repassword}
                       autoComplete={false}
                     
                       style={styles.textinputstyle}
                       mode="flat"
                    error={errors.repassword ? true : false}
                      secureTextEntry={visible}
                      onChangeText={handleChange('repassword')}
                      />
                      
                      {errors.repassword && 
                        <Text style={{ color:'red'}}>
                          {errors.repassword}
                        </Text>}
                      </View>

                    <View style={styles.custominputext3}>
                          <Button
                                    title="Sign Up"
                                    buttonStyle={{
                                    height:50,
                                    borderRadius:5,  
                                    padding:6, 
                                    backgroundColor:'#03396c',
                                    alignSelf:"center",
                                    width:"100%",
                                    marginHorizontal:58,
                                    marginTop:10  
                                      
                                    }}
                                  titleStyle={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontFamily: 'poppins-regular',
                                    textAlign: 'center',
                                    fontWeight:"bold"
                                
                                  }}
                                  onPress={() => handleSubmit() }
                            
                                  />
                              </View>

                              <View style={styles.orcontainer}>
                                <View style={styles.line} />
                                  <View>
                                <Text style={{width: 50, textAlign: 'center'}}>or</Text>
                                </View>
                                <View style={styles.line} />
                                </View>

                                <View style={styles.otherregistration}>
                                  <View style={styles.signin}>
                                  <Image source={{ uri: 'https://logowik.com/content/uploads/images/985_google_g_icon.jpg' }}
                                  style={{
                                    resizeMode:"cover",
                                    height:35,
                                    width:35,
                                    backgroundColor:"transparent",
                                    alignSelf:"center"
                                  }}
                                  >
                                  </Image>
                                  <Text style={{alignSelf:"center", color:"black", fontWeight:"bold", fontSize:15}}>Google</Text>
                                  </View>

                                  <View style={styles.signin}>
                                  <Image source={{ uri: 'https://i.pinimg.com/564x/b3/26/b5/b326b5f8d23cd1e0f18df4c9265416f7--facebook-icon-negative-feedback.jpg' }}
                                  style={{
                                    resizeMode:"contain",
                                    height:35,
                                    width:35,
                                    backgroundColor:"transparent",
                                    alignSelf:"center"
                                  }}
                                  >
                                  </Image>
                                  <Text style={{alignSelf:"center", color:"black", fontWeight:"bold", fontSize:15}}>Facebook</Text>
                                  </View>
                              
                                </View>
                              </Fragment>
                      )}
                      </Formik>

</View>
     
            </View>
  
</View>

</ScrollView>

  );
      }
              
const styles=StyleSheet.create({
  container1:{
    alignItems:'center',
  flex:1
  },
 
  container2:{
    flex:1, height:"auto", 
    width:"100%", 
    borderRadius:30, 
    position:'absolute', 
    marginTop:210,
    backgroundColor:'white',

  },

  logo:{
  width:"100%",
  position:"relative",
  height:400,
  resizeMode:"cover"
  },

  custominputext1:{
    backgroundColor:"white",
    width:140, 
    justifyContent:"center", 
    padding:0, 
    alignSelf:'center'
  },

  firstlastnamecontainer:{
    backgroundColor:"white",
    width:"80%", 
    justifyContent:"space-between", 
    marginTop:35, 
    padding:0, 
    alignSelf:'center',
    flexDirection:"row",
  },

  custominputext:{
    backgroundColor:"white",
    width:"80%", 
    justifyContent:"center", 
    marginTop:15, 
    padding:0, 
    alignSelf:"center"
  },

  custominputext3:{
    backgroundColor:"white",
    width:"80%", 
    justifyContent:"center", 
    marginTop:20, 
    padding:0, 
    alignSelf:"center",
    marginBottom:30
  },

  registercontainer:{
    fontSize:38,
    color:"white", 
    fontWeight:'bold',
  },

  newaccountcontainer:{
color:'white',
fontSize:20,

  },

  container3:{
marginTop:100,
justifyContent:"center",
alignSelf:'flex-start',
marginHorizontal:20, 
backgroundColor:'transparent',
position:'absolute'
  },

  line:{
    flex: 1, 
    height: 1, 
    backgroundColor: 'black'
  },

  orcontainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    width:"80%", 
    justifyContent:"center", 
    alignSelf:'center'
  },

  otherregistration:{
    flexDirection:"row", 
    width:"75%", 
    alignSelf:"center",
    justifyContent:"space-between", 
    backgroundColor:"white", 
    padding:0, 
    marginTop:20
  },

  signin:{
    borderRadius:15, 
    borderColor:"#c4c4c4",
    borderWidth:1, 
    backgroundColor:"white", 
    flexDirection:"row", 
    height:50, 
    width:135, 
    justifyContent:"center",
  },

  textinputstyle:{
    backgroundColor:"white",
    width: "100%",
    alignSelf:'center',
    height:60
  }



});