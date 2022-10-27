import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList } from 'react-native'
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { milk, milk2, Shops, Data } from '../DataAsset/data';
import { CheckBox } from 'react-native-elements';
import { Icon, withBadge } from 'react-native-elements'
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchedResults = ({ route, navigation, searched,myList }) => {
  const [result, setResult] = useState('');
  const [indexCheck, setIndexCheck] = useState("0");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const theChecked = [];
  const BadgeIcon = withBadge(0)(Icon);

  useEffect(() => {
    setData(route.params.item)
    // restoreListFromAsync() 
  }, [])

  const storeData = async (value) => {


    try {
      // const newItem = [ value , ...listItem];
      await restoreListFromAsync().then(() => {
        // const newL = [...myList, value]
        myList.push(value)
        console.log('====================================');
        console.log(myList);
        console.log('====================================');
        const jsonValue = JSON.stringify(myList)
        AsyncStorage.setItem('@storage_Key', jsonValue).then({
          myList: []
        })
      })


    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  const restoreListFromAsync = async () => {
    myList = []

    await AsyncStorage.getItem('@storage_Key')
      .then(stringifiedList => {
        console.log('Restored Todos:');
        console.log(stringifiedList);

        const parsedList = JSON.parse(stringifiedList);

        if (!parsedList || typeof parsedList !== 'object') return;

        myList = parsedList
        // setListItem(parsedList);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
    }

    console.log('Done.')
  }


  // console.log(cart);
  // const click = () => {
  //   if (checked === true) {
  //     theChecked.push("true");
  //   }
  // }

  // function events() {
  //   if (result === "milk") {
  //     data.push(milk)
  //   } else if (result === "Shops") {
  //     data.push(Shops)
  //   } else if (result === "Data") {
  //     data.push(Data)
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Icon name="home"
          size={25}
          color="#20DC49"
          style={{ marginLeft: 20, marginTop: 20 }}
          onPress={()=>navigation.navigate('HomePage')}
        />

        <Text style={styles.searchTxt}>Searched Results</Text>
        <TouchableOpacity style={{ marginTop: 20, marginRight: 20 }}
        onPress={() => navigation.navigate('List',{'cartList':myList})}>
          <BadgeIcon name="list-alt"
            size={30}
            color="#20DC49"
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -10 }}>
        <View style={styles.leftLine}></View>
        <View style={styles.rightLine}></View>
      </View>
      <TouchableOpacity onPress={() => clearStorage()}>
                  <Text style={{color:'white'}}>Clear</Text>
                </TouchableOpacity>
      <ScrollView>
        <View
          style={{ flex: 1, flexDirection: 'row', height: '60vh', width: '100vw', marginTop: 20, marginBottom: 40, flexWrap: 'wrap' }}>
          {data.map((item, index) => {
            return <View style={styles.popularPics} key={index}>
              <Image
                style={{ height: '10vh', width: '30vw' }}
                source={item.image}
              />
              <View>
                <Text style={styles.txt}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.txt}>R{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => storeData(item)} style={{ backgroundColor: 'green', alignItems: "center", justifyContent: 'center'
                }}>
                <Text style={{ color: '#fff'}}>Add to list</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{backgroundColor:'green',alignItems:"center",justifyContent:'center'}}>
                                  <Text style={{color:'#fff'}}>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'green',alignItems:"center",justifyContent:'center'}}>
                                  <Text style={{color:'#fff'}}>{'0'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'green',alignItems:"center",justifyContent:'center'}}>
                                  <Text style={{color:'#fff'}}>+</Text>
                                </TouchableOpacity> */}
              {/* <CheckBox title="" checked={checked} onPress={()=>setChecked(checked)}/> */}
            </View>

          })}



        </View>
      </ScrollView>

    </View>
  )
}

export default SearchedResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2D44",
    flex: 1,
    //justifyContent: "center",
    height: '100%',
    width: '100%',
  },
  nav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -50
  },
  searchTxt: {
    fontSize: 15,
    color: '#20DC49',
    fontWeight: 'bold',
    marginTop: 140,
  },
  leftLine: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 140
  },
  rightLine: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 140,
    alignSelf: 'flex-end'
  },
  AddBtn: {
    backgroundColor: '#20DC49',
    height: 50,
    width: 150,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center'


  },
  popularPics: {
    width: "32vw",
    marginLeft: '1vw',
    height: '21vh',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'grey'

  },
  txt:{
    color:'white',
    flexGrow:1,
    fontSize:10,
  }
})