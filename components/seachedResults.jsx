import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { getItemCount } from '../DataAsset/data';
import { Icon, withBadge } from 'react-native-elements'
import { ScrollView } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSelectedList, setSelectedList } from '../DataAsset/data';

const SearchedResults = ({ route, navigation, searched, myList }) => {
  const [data, setData] = useState([]);
  const [itemCount, setItemCount] = useState(0)
  const BadgeIcon = withBadge(itemCount)(Icon);

  useEffect(() => {
    setData(route.params.item)
  }, [])

  const storeData = async (value) => {


    try {
      await restoreListFromAsync().then(() => {

        myList.push({ value, qty: 1 })
        setSelectedList({ value, qty: 1 })
        setItemCount(getItemCount())
        const jsonValue = JSON.stringify(getSelectedList())
        AsyncStorage.setItem('@storage_Key', jsonValue).then({
          myList: []
        })
      })


    } catch (e) {
      
     alert('Error occured')
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

      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  };



  const Item = ({ itemData }) => (

    <View style={styles.popularPics} >
      <Image
        style={{ height: '10vh', width: '30vw' }}
        source={itemData.image}
      />
      <View>
        <Text style={styles.txt}>{itemData.name}</Text>
      </View>
      <View>
        <Text style={styles.txt}>R{itemData.price}</Text>
      </View>
      <TouchableOpacity onPress={() => storeData(itemData)} style={styles.AddBtn}>
        <Text style={{ color: '#fff' }}>+</Text>
      </TouchableOpacity>
    </View>


  );
  const renderItem = ({ item }) => <Item itemData={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Icon name="search"
          size={25}
          color="#20DC49"
          style={{ marginLeft: 20, marginTop: 20 }}
          onPress={() => navigation.navigate('HomePage')}
        />

        <Text style={styles.searchTxt}>Searched Results</Text>
        <View>
          <TouchableOpacity style={{ marginTop: 20, marginRight: 20 }}
            onPress={() => navigation.navigate('List')}>
            <View>
              <BadgeIcon name="list-alt"
                size={30}
                color="#20DC49"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: -10 }}>
        <View style={styles.leftLine}></View>
        <View style={styles.rightLine}></View>
      </View>
      <ScrollView>

        <SafeAreaView style={styles.content}>
          <FlatList numColumns={2} data={data} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default SearchedResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2D44",
    flex: 1,
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
    height: 20,
    width: 20,
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    right: 0

  },
  popularPics: {
    width: "40vw",
    height: '21vh',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10

  },
  txt: {
    color: 'white',
    flexGrow: 1,
    fontSize: 10,
    margin: 10
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginTop: 20

  }
})