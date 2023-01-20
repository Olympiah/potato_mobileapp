import { Platform, StyleSheet, StatusBar,Text, View,TouchableOpacity,Dimensions } from 'react-native';
import React,{useState} from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { Input, Icon } from 'react-native-elements';
import  * as Animatable from 'react-native-animatable';
// import { auth } from '../utils/firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({navigation}) => {

    const[data,setData]= useState({
      email:'',
      password:'',
      name:'',
      confirm_password:'',
      check_textInputChange:false,
      check_nameInputChange:false,
      secureTextEntry:true,
      confirm_secureTextEntry:false
   });

   const handleSignUp = ()=> {
    
     auth.createUserWithEmailAndPassword(email,password)
      .then(userCredentials=>{
       const user= userCredentials.user;
       console.log("SignUp is succesfull");
     })
     .catch(error=> alert(error.message))
   }
 
   const textInputChange =(val)=>{
     if(val.length != 0) {
       setData({
         ...data,
         email:val,
         check_textInputChange:true
       });
     } 
     else{
       setData({
         ...data,
         email:val,
         check_textInputChange:false
       });  
     }
   }

   const nameInputChange =(val)=>{
    if(val.length != 0) {
      setData({
        ...data,
        name:val,
        check_nameInputChange:true
      });
    } 
    else{
      setData({
        ...data,
        name:val,
        check_nameInputChange:false
      });  
    }
  }
 
   const handlePasswordChange=(val)=>{
     setData({
       ...data,
       password:val
     });
   }
   const handleConfirmPasswordChange=(val)=>{
    setData({
      ...data,
      confirm_password:val
    });
  }
 
   const updateSecureTextEntry=()=>{
     setData({
       ...data,
       secureTextEntry: !data.secureTextEntry
     })
   }

   const updateConfirmSecureTextEntry=()=>{
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    })
  }
 
  



   return (
     <View style={styles.container}>
       <StatusBar backgroundColor={'orange'} barStyle='light-content'/>
       <View style={styles.header}>
         <Text style={styles.text_header}> Create account Now! </Text>
       </View>
       <Animatable.View 
         animation='fadeInUpBig'
        style={styles.footer}>
         <Text style={styles.text_footer}> Name</Text>
         <View style={styles.action}
            >
          
           <Input
            style={styles.text_input}
            color="#14213d"
            placeholder='Jason Derulo'
            onChangeText={(val)=> nameInputChange(val)}
            leftIcon={
            <Icon
            type= 'font-awesome'
            name='user'
            size={20}
            color='#14213d'
              /> 
            }
           /> 
            {data.check_nameInputChange ?
           <Animatable.View
           animation='bounceIn'>
             
           <Feather
             name='check-circle'
             color='#14213d'
             size={20}
           />  
           </Animatable.View>
           
           :null}
         </View>
         <Text style={styles.text_footer}> Email</Text>
         <View style={styles.action}
            styles={{flexDirection:'row'}}>
          
           <Input
            style={styles.text_input}
            autoCapitalize='none'
            color="#14213d"
            placeholder='jasonD@you.com'
            onChangeText={(val)=> textInputChange(val)}
            leftIcon={
            <Icon
            type= 'font-awesome'
            name='user'
            size={20}
            color='#14213d'
              /> 
            }
           /> 
            {data.check_textInputChange ?
           <Animatable.View
           animation='bounceIn'>
             
           <Feather
             name='check-circle'
             color='#14213d'
             size={20}
           />  
           </Animatable.View>
           
           :null}
         </View>
         <Text 
         style={{marginTop:5, fontSize:18,color:'#14213d'}}> 
         Password
         </Text>
         <View style={styles.action}
            >
           <Input
            style={styles.text_input}
            secureTextEntry={data.secureTextEntry? true :false}
            autoCapitalize='none'
            color="#14213d"
            placeholder='Your Password'
            onChangeText={(val)=> handlePasswordChange(val)}
            leftIcon={
            <Icon
            type= 'font-awesome'
            name='lock'
            size={20}
            color='#14213d'
              /> 
            }
           /> 
           <TouchableOpacity
             onPress={updateSecureTextEntry}>
            {data.secureTextEntry?   
           <Feather
             name='eye-off'
             color='#6b705c'
             size={20}
           />
           :
           <Feather
             name='eye'
             color='#6b705c'
             size={20}
           />
            }
           </TouchableOpacity>
         </View>
         <Text 
         style={{marginTop:5, fontSize:18,color:'#14213d'}}> 
         Confirm Password
         </Text>
         <View style={styles.action}
            >
           <Input
            style={styles.text_input}
            secureTextEntry={data.confirm_secureTextEntry? true :false}
            autoCapitalize='none'
            color="#14213d"
            placeholder='Your Password'
            onChangeText={(val)=> handleConfirmPasswordChange(val)}
            leftIcon={
            <Icon
            type= 'font-awesome'
            name='lock'
            size={20}
            color='#14213d'
              /> 
            }
           /> 
           <TouchableOpacity
             onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry?   
           <Feather
             name='eye-off'
             color='#6b705c'
             size={20}
           />
           :
           <Feather
             name='eye'
             color='#6b705c'
             size={20}
           />
            }
           </TouchableOpacity>
         </View>
         {/* <View style={styles.button}> */}
           <TouchableOpacity 
            style= {styles.button}
            onPress={handleSignUp}
           >
           <LinearGradient
            style={styles.signIn}
            colors={['#a68a64','#fca311']}
            >
            <Text
             style={styles.textSign}>
             Sign Up 
            </Text>
           </LinearGradient> 
{/*  
           <TouchableOpacity
            onPress={()=>navigation.push('Signup')}
            style={[styles.signIn,
            {
            borderColor:'#fb8500',
            borderWidth:1,
            marginTop:15,
            }]}>
             <Text 
             style={{
             color:'#023047',
             fontWeight:'bold'}}>
               SignUp
               </Text>
           </TouchableOpacity> */}
         {/* </View> */}
         </TouchableOpacity>
       </Animatable.View>
     </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'orange',
},

button:{
  alignItems:'flex-end',
  marginTop:20,
},
signIn:{
 width:'100%',
 height:50,
 justifyContent:'center',
 alignItems:'center',
 borderRadius:10,
},
textSign:{
 color:'white',
 fontWeight:'bold',
},

footer:{
  flex:3,
  backgroundColor: '#fff',
  borderTopRightRadius:30,
  borderTopLeftRadius:30,
  paddingVertical:30,
  paddingHorizontal:30,
  
},
header:{
  flex:1,
  justifyContent:'flex-end',
  paddingHorizontal:20,
  paddingBottom:15
},
text_header:{
  color:'white',
  fontWeight:'bold',
  fontSize:30
},
text_footer:{
  color:'#14213d',
  fontSize:18
},
action:{
  flexDirection:'row',
  marginTop:5,
  borderBottomWidth:1,
  borderBottomColor:'#f2f2f2',
  paddingBottom:2
},
text_input:{
  flex:1,
  marginTop:Platform.OS === 'ios' ? 0 : -10,
  paddingLeft:10,
  color:'#14213d'
}

});
