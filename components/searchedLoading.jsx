import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList } from 'react-native'
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
//import LottieView from 'lottie-react-native';

const SearchedLoading = () => {
  const animation = useRef(null);
  return (
    <View>
      <View style={styles.nav}>
        <Icon name="home"
          size={25}
          color="#20DC49"
          style={{ marginLeft: 20, marginTop: 20 }}
        />

        <Text style={styles.searchTxt}>Searched Results</Text>
        <Icon name="list-alt"
          size={25}
          color="#20DC49"
          style={{ marginRight: 20, marginTop: 20 }}
        />
      </View>
      <View style={{ marginTop: -10 }}>
        <View style={styles.leftLine}></View>
        <View style={styles.rightLine}></View>
      </View>

      <View style={styles.search}>
        <TextInput type="text" placeholder='Results' style={styles.searchResults}
          onChangeText={(e) => setResult(e)} />
        <Icon
          name="search"
          size={25}
          color="black"
          style={{ marginLeft: 80 }}
        />
      </View>

      {/* <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#eee',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../assets/loader.json')}
          
        />
      </View> */}
    </View>
  )
}

export default SearchedLoading;

const styles = StyleSheet.create({
  container: {
    //backgroundColor:"#1D2D44",
    flex: 1,
    //justifyContent: "center",
    height: '100%',
    width: '100%',
  },
  nav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -500
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
  search: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    height: 50,
    marginTop: '20%',
    marginBottom: '8%',
    marginLeft: '15%',
    borderColor: '#20DC49',
    borderWidth: 2,
    borderRadius: 15,
  },
  searchResults: {

  }
})
