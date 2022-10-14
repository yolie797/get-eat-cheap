import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import SelectList from 'react-native-dropdown-select-list'


const HomePage = () =>{
 
    return(
        <View style={styles.container}>
            <View style={styles.nav}>
                  <Icon2 name="profile"
                    size={25}
                    color="#20DC49"
                    style={{marginBottom:60,marginLeft:10}}
                    />

                    <Text style={{fontSize:25,color:'#20DC49',fontWeight:'bold',marginTop:30,marginLeft:2}}>GetEatCheap</Text>

                    <Icon 
                    name="bars"
                    size={25}
                    color='#20DC49'
                    style={{marginBottom:60,marginRight:10}}
                    />
            </View>

           <View style={styles.borderLine}></View>

            <View style={styles.searchBar}>
                  <TextInput type="text" placeholder='Search Product' style={styles.searchProduct}/>
                  <Icon 
                  name="search"
                  size={25}
                  color="black"
                  style={{marginLeft:80}}
                  />
            </View>

            <View style={styles.searchTab}> 
                <View style={styles.leftLine}></View>
                <Text style={{color:'#20DC49'}}>Popular Searches</Text>
                <View style={styles.rightLine}></View>
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
      nav:{
        width:'100%',
        height:'10%',
        marginTop:-650,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
      },
      borderLine:{
        borderBottomWidth:2,
        borderBottomColor:'#fff'
      },
     searchBar:{
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        width:'70%',
        height:'6%',
        marginTop:'10%',
        marginLeft:'15%',
        borderColor:'#20DC49',
        borderWidth:2,
        borderRadius:15,
      },
      leftLine:{
        borderTopWidth:1,
        borderTopColor:'#fff',
        width:150,
      },
      rightLine:{
        borderTopWidth:1,
        borderTopColor:'#fff',
        width:150,
      },
      searchTab:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:40,
      }
     
     
})