import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity,Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list'
import { Avatar} from 'react-native-paper';
import { auth, db } from './config/firebase';
import { signOut } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';

const Profile =({navigation})=>{
    const [Pic,SetPic] = React.useState('');

    const [email, setEmail] = useState('');

const [profile, setProfile] = useState({});
const productsCollection = collection(db, 'profiles')

  const getProfile = async() =>{
      const q = query(productsCollection, where('email', '==', auth.currentUser.email));
      const querySnapShots = await getDocs(q);
  
      let tmpProfile = [];
  
      querySnapShots.forEach(
      (profile) => {
          console.log(profile.data());
      //   tmpProfile.push({...profile.data(), id: profile.id});
        tmpProfile = profile.data();
        console.log(tmpProfile);
      }
      );
  
      setProfile(tmpProfile);
  }

  useEffect(()=>{
      // console.log( auth.currentUser.email);
      getProfile();
    },[])

    useEffect(()=>{
  if (auth.currentUser) {
    setEmail(auth.currentUser.email);
  } else {
    navigation.navigate('Login');
  }
}, []);
const logout = async() => {
  await signOut(auth).then(
    ()=> {
      navigation.navigate('Login');
    }
  )
}
return(
    <View style={styles.container}>
        <View style={styles.nav}>
            <Icon style={styles.listIcon} name="close" size={20} color="#20DC49"
            onPress={()=>navigation.navigate('HomePage')}/>
            <TouchableOpacity style={styles.logout} onPress={logout}>Logout</TouchableOpacity>
            <Text style={styles.textProfile}>Profile</Text>
        </View>
        <View>
            <TouchableOpacity>
                <View style={styles.profilePicTab}>
                    <Icon style={styles.userIcon} name="user" size={100} color="#fff"/>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{alignSelf:'center',marginTop:-75}}>
            <Text style={{fontSize:12,color:'#20DC49'}}>Change Profile Picture</Text>
        </View>
        <View>
            <View style={styles.inputs}>
                <Text style={styles.textProfile}> {profile.firstname} </Text>
                <Icon style={styles.editIcon} name="edit" size={20} color="#fff"/>
            </View>
            <View style={styles.inputs}>
                <Text style={styles.textProfile}> {profile.lastname} </Text>
                <Icon style={styles.editIcon} name="edit" size={20} color="#fff"/>
            </View>
           <View style={styles.inputs}>
                <Text style={styles.textProfile}>{profile.email}</Text>
                <Icon style={styles.editIcon} name="edit" size={20} color="#fff"/>
           </View>
            
        </View>
        <View style={styles.btnHistory}>
            <TouchableOpacity style={styles.historyBtn}>View History</TouchableOpacity>
        </View>
    </View>
)
}

export default Profile;

const styles = StyleSheet.create({
container: {
    /*flex: 1,
    justifyContent: "center",*/
    height:'100%',
    backgroundColor:'#1D2D44',
   
},
nav:{
    //display:'flex',
    //alignItems:'center',
    marginBottom:2,
    flexDirection:'row',
    height:'50%',
    width:'100%',
},
logout:{
    color:'#20DC49',
    marginLeft:'82%',
    fontSize:12,
    marginBottom:70,
},
textStyle:{
    height:20,
    width:50,
    fontSize:100,
    color: 'lime',
    marginTop: '50%',
    marginLeft:'50%',
},
textProfile:{
    fontSize:40,
    color:'#20DC49',
    marginLeft:-220,
    marginTop:50,
},
listIcon:{
    marginBottom:70,
},
profilePicTab:{
    /*height:'70%',*/
    marginTop:20,
    width: 150,
    height: 150,
    borderRadius: '50%',
    backgroundColor: '#20DC49',
    borderColor: '#20DC49',
    borderWidth: 2,
    marginLeft:'32%',
    marginTop:-250
},
userIcon:{
    marginLeft:'25%',
},
inputs:{
    flexDirection:'row',
    marginTop:30,
    height:'30%',
    width:'60%',
    backgroundColor:'#fff',
    marginLeft:'20%',
    borderColor:'black',
    borderWidth:2,
    alignItems:'center',
    borderRadius:15,
},
editIcon:{
    color:'black',
},
historyBtn:{
    borderWidth: 2,
    borderColor:'transparent',
    backgroundColor:'#20DC49',
    width:'40%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 15,
    marginTop:100,
    marginLeft:'30%',
},

textProfile:{

    width: '91%',
          

}

})