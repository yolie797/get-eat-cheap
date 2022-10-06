import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import Search from './components/search';

export default function App() {
  const [dataSource] = useState([])
  const [filtered, setFiltered] = useState(dataSource)
  const [searching, setSearching] = useState(false)
  
  const onSearch = (text) => {
    if (text) {
      setSearching(true)
      const temp = text.toLowerCase()

      const tempList = dataSource.filter(item => {
        if (item.match(temp))
          return item
      })
      setFiltered(tempList)
    }
    else {
      setSearching(false)
      setFiltered(dataSource)
    }

  }
  
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor='white'
        onChangeText={onSearch}

      />
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, }}> Products </Text>
        <View style={{
          flexWrap: 'wrap', flexDirection: 'row',
          justifyContent: 'center'

        }}>
          {
            dataSource.map((item, index) => {
              return (
                <View style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 80, width: 80, backgroundColor: randomColor()
                }}>
                  <Text style={{ fontSize: 15, }}>
                    {item}
                  </Text>
                </View>
              )
            })
          }
        </View>

      </View>

      {/* your components can stay here like anything */}
      {/* and at the end of view */}
      {
        searching &&
        <Search
          onPress={() => setSearching(false)}
          dataSource={filtered} />
      }
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    flex: 1
  },
  textInput: {
    backgroundColor: '#BFBFBF',
    width: '80%',
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});