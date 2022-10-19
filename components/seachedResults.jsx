import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity,Image,FlatList } from 'react-native'
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {milk,Shops,Data} from '../DataAsset/data'

const SearchedResults = () =>{
    const[result,setResult] = useState('');
    const [indexCheck,setIndexCheck] = useState("0");
    const [data,setData] = useState([]);

    function events(){
    if(result==="milk"){
        data.push(milk)
    }else if(result==="Shops"){
        data.push(Shops)
    }else if(result==="Data"){
        data.push(Data)
    }
        
        console.log(data);
    }

    useEffect(()=>{
        
    })
    return(
        <View style={styles.container}>
            <View style={styles.nav}>
                <Icon name="home"
                        size={25}
                        color="#20DC49"
                        style={{marginLeft:20,marginTop:20}}
                    />
                    
                <Text style={styles.searchTxt}>Searched Results</Text>
                <Icon name="list-alt"
                        size={25}
                        color="#20DC49"
                        style={{marginRight:20,marginTop:20}}
                    />
            </View>
            <View style={{marginTop:-10}}>
                <View style={styles.leftLine}></View>
                <View style={styles.rightLine}></View>
            </View>

            <View style={styles.search}>
                <TextInput type="text" placeholder='Results' style={styles.searchResults}
                onChangeText={(e)=> setResult(e)}/>
                    <Icon 
                    name="search"
                    size={25}
                    color="black"
                    style={{marginLeft:80}}
                    onPress={events}/>
            </View>

            <View style={styles.listResults}>
            <View style={{marginTop:15,marginBottom:15}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                    style={{marginTop:50,marginLeft:60,marginRight:60}}
                    data={milk}
                    keyExtractor={(item)=>item.id}
                    extraData={indexCheck}
                    renderItem={({item})=>(
                            <View style={styles.popularPics}>
                                <Image
                                style={{height:70,width:70,borderRadius:20,backgroundColor:'#fff',marginLeft:10}}
                                source={item.image}
                                />
                                
                            </View>
              
                    )}
                     />
                </View>
            </View>
            
        </View>
    )
}

export default SearchedResults;

const styles = StyleSheet.create({
    container: {
        //backgroundColor:"#1D2D44",
        flex: 1,
        //justifyContent: "center",
        height:'100%',
        width:'100%',
      },
      nav:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:-50
      },
      searchTxt:{
        fontSize:15,
        color:'#20DC49',
        fontWeight:'bold',
        marginTop:120,
      },
      leftLine:{
        borderTopWidth:1,
        borderTopColor:'#fff',
        width:140
      },
      rightLine:{
        borderTopWidth:1,
        borderTopColor:'#fff',
        width:140,
        alignSelf:'flex-end'
      },
      search:{
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        width:'70%',
        height:'6%',
        marginTop:'17%',
        marginBottom:'8%',
        marginLeft:'15%',
        borderColor:'#20DC49',
        borderWidth:2,
        borderRadius:15,
      },
      searchResults:{

      }
})