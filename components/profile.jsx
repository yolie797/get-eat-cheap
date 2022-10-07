import React from 'react'
import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list'

const Profile =()=>{
    return(
        <View style={styles.container}>
            <View style={styles.nav}>
                <Icon style={styles.listIcon} name="close" size={20} color="#20DC49"/>
                <TouchableOpacity style={styles.logout}>Logout</TouchableOpacity>
                <Text style={styles.textProfile}>Profile</Text>
            </View>
            
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    nav:{
        display:'flex',
        alignItems:'center',
        marginBottom:1000,
        flexDirection:'row'
        
    },
    logout:{
        color:'#20DC49',
        marginLeft:'82%',
        fontSize:12,
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
    }
})