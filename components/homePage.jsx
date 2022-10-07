import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list'


const HomePage = () =>{
 
    return(
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={styles.theIcons}>
                    <Icon style={styles.listIcon} name="list" size={23} color="#20DC49"/>
                    <Icon style={styles.userIcon} name="user" size={23} color="#20DC49"/>
                </View>
                <View>
                    <Text style={styles.headerText}>GetEatCheap</Text>
                </View>
                <View style={styles.borderLine}></View>
            </View>

            <View style={styles.body}>
                <View>
                    <TextInput style={styles.textBudget}
                      placeholder="Enter Budget"/>
                </View>
                
            </View>
            
        </View>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        //backgroundColor:"#1D2D44",
        flex: 1,
        justifyContent: "center",
      },
      navigation: {
        alignItems: "center",
        justifyContent: "center",
       display:'flex',
       height: 80,
       borderBottomWidth:2,
       borderBottomColor: 'red',
      },
      theIcons: {
        display: 'flex',
        marginTop: -20,
      },
      listIcon: {
        marginRight:600,
      },
      userIcon: {
        marginLeft:600,
        marginTop:-25,
      },
      headerText: {
        fontWeight:'bold',
        fontSize:20,
        fontStyle:'italic',
        color:'#20DC49',
        marginBottom:'-10%',
      },
      textBudget: {
        
      }
     
})