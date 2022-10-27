import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../CustomInput/CustomInput'
import CustomButton from '../../CustomButton/CustomButton';
import GoogleButton from 'react-google-button'
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"
import { TouchableOpacity } from 'react-native-web';
import { Navigation } from 'swiper';

const SignUpScreen = ({ navigation }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const onCreateAccountPressed = () => {
    console.warn('onCreateAccountPressed');

  }

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  }

  const onSignInPressed = () => {
    console.warn('Sign in');

  }

  //   const registerWithEmail = async() => {
  //     console.log(email);
  //     //check if inputs are empty
  //     if (email === '') {
  //         //email empty
  //         //setErrMsg('Email is required to register');
  //         alert('Email is required to register');
  //     } else {
  //         if (password === '') {
  //             //new password empty
  //             //setErrMsg('Password is required to register');
  //             alert('Wrong password')
  //         } else {
  //             if (confirmpassword === '') {
  //                 //confirm password empty
  //                 alert('Wrong Password')
  //                 //setErrMsg('Confirm password is required to register');
  //             } else {
  //                 if (password !== confirmpassword) {
  //                     //pasword does not match
  //                     //setErrMsg('Passwords entered does not match');
  //                     alert('passwords do not match')
  //                 } else {
  //                     //good to go
  //                     await createUserWithEmailAndPassword(auth, email, password).then(
  //                         userCridential => {
  //                             //setErrMsg('');
  //                             const collectionRef = collection(db, "profiles");
  //                             const profile = {
  //                               firstname: firstname,
  //                               lastname: lastname,
  //                               email: email,
  //                             };

  //                             addDoc(collectionRef, profile).then(() => {
  //                                 alert("Registered successfully");
  //                                 navigation.navigate('WelcomePage')
  //                             }).catch((err) => {
  //                                 console.log(err);
  //                             })
  //                         }
  //                     ).catch(
  //                         err => {
  //                             alert('Failed to register')
  //                         }
  //                     )
  //                 }
  //             }
  //         }
  //     }
  // }

  const handleSignUp = () => {
    if (email === '') {
      //email empty
      //setErrMsg('Email is required to register');
      alert('Email is required to register');
    } else {
      if (password === '') {
        //new password empty
        //setErrMsg('Password is required to register');
        alert('Wrong password')
      } else {
        if (confirmpassword === '') {
          //confirm password empty
          alert('Wrong Password')
          //setErrMsg('Confirm password is required to register');
        } else {
          createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
            const collectionRef = collection(db, "profiles");
            const profile = {
              firstname: firstname,
              lastname: lastname,
              email: email,
            };

            addDoc(collectionRef, profile).then(() => {
              alert("Registered successfully");
              navigation.navigate('Login')
            }).catch((err) => {
              console.log(err);
            })
          }).catch(error => alert(error.message))
        }
      }
    }

  }

  return (

    <View style={styles.root}>
      <View>
        <Text style={{ color: '#20DC49', fontSize: 30, fontWeight: 'bold' }}>Sign Up</Text>
      </View>
      <View>
        <Text style={styles.title1}>GetEatCheap</Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
        <View style={styles.line1}></View>
        <Text style={{ color: '#20DC49', marginLeft: 10, marginRight: 10, fontSize: 10 }}>Or continue with</Text>
        <View style={styles.line2}></View>
      </View>

      <View style={{ marginTop: 30 }}>
        <CustomInput placeholder="First Name" value={firstname} setValue={setFirstName} />

        <CustomInput placeholder="Last Name" value={lastname} setValue={setLastName} />

        <CustomInput placeholder="Enter Email" value={email} setValue={setEmail} />

        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

        <CustomInput placeholder="Confirm password" value={confirmpassword} setValue={setConfirmPassword} secureTextEntry />

      </View>
      <View>
        <CustomButton text="Create Account" onPress={handleSignUp} />
      </View>
      {/* <View style={{alignItems:'center',flexDirection:'row'}}>
          <Icon name="google" size={25} color="red"/>
          <CustomButton text="SignUp with Google" onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44"/>
        </View> */}
      <View>
        <GoogleButton style={{ width: 200, marginTop: 20 }} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ color: '#fff' }}>Have an account?</Text>
        <TouchableOpacity style={{ color: '#20DC49' }}
          onPress={() => navigation.navigate('Login')}>SignIn
        </TouchableOpacity>
      </View>

      {/* <CustomButton text="Have an account? SignIn" onPress={onSignInPressed} type="TERTIARY" /> */}

    </View>

  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1D2D44',
    alignItems: 'center',
    height: '100%'
  },
  title1: {
    fontSize: 25,
    //fontWeight: 'bold',
    color: '#20DC49',
    margin: 10,
    marginTop: 25,

  },
  title2: {
    fontSize: 15,
    color: '#50E683',
    margin: 10,
  },
  line1: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: 160,
    marginLeft: -35

  },
  line2: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: 160,
    marginRight: -35
  },


});

export default SignUpScreen