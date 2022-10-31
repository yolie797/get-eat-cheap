import { View, Text, StyleSheet, ScrollView, Linking, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../CustomInput/CustomInput'
import CustomButton from '../../CustomButton/CustomButton';
import GoogleButton from 'react-google-button'
import basket from '../../../assets/trolley.jpg'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore"
import { TouchableOpacity } from 'react-native-web';





const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const provider = new GoogleAuthProvider();

  const signin=()=> {
    signInWithPopup(auth, provider)
      .then((result) => {
       
        navigation.navigate('WelcomePage')

      }).catch((error) => {
        alert('Failed to sign in with google')
      });
  }

  const onSignInPressed = () => {
    console.warn('onSignInPressed');

  };

  const onSignUpPressed = () => {
    console.warn('onSignUpPressed');

  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
      navigation.navigate('WelcomePage')
    }).catch(error => alert(error.message))
  }

  return (
    <View style={styles.root}>
      <View>
        <Image source={basket} style={{ width: 200, height: 180 }} />
      </View>
      <View>
        <Text style={{ color: '#20DC49', fontSize: 30, fontWeight: 'bold' }}>Welcome Back</Text>
      </View>
      <View>
        <Text style={styles.title1}>Login to your account</Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
        <View style={styles.line1}></View>
        <Text style={{ color: '#20DC49', marginLeft: 10, marginRight: 10, fontSize: 10 }}>Or continue with</Text>
        <View style={styles.line2}></View>
      </View>
      <View style={{ marginTop: 30 }}>
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      </View>
      <View>
        <CustomButton text="Log in Account" onPress={handleSignIn} />
      </View>
      <View>
        <GoogleButton style={{ width: 200, marginTop: 20 }} onClick={signin}/>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ color: '#fff' }}>Have an account?</Text>
        <TouchableOpacity style={{ color: '#20DC49' }}
          onPress={() => navigation.navigate('signUp')}>SignUp
        </TouchableOpacity>
      </View>

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
    fontSize: 16,
    color: '#50E683',
    margin: 10,
  },
  title2: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#50E683',
    margin: 10,
  },
  title3: {
    fontSize: 15,
    color: '#50E683',
    margin: 20,
  },
  title4: {
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

export default SignInScreen