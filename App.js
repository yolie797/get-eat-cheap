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
import HomePage from './components/homePage'
import welcomePage from './components/WelcomePage'
import Profile from './components/profile';
import SearchedResults from './components/seachedResults';
import ListModiakgotla from './components/ListModiakgotla';
import SearchedLoading from './components/searchedLoading';
import List from './components/list';
import SignInScreen from './components/authScreens/SigninScreen/SignInScreen';
import SignUpScreen from './components/authScreens/SignUpScreen/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
     
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Login" component={SignInScreen} options={{headerShown:false}}/>
          <Stack.Screen name ='signUp' component={SignUpScreen} options={{headerShown:false}}/>
          <Stack.Screen name='WelcomePage' component={welcomePage} options={{headerShown:false}}/>
          <Stack.Screen name='HomePage' component={HomePage} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name='SearchedResults' component={SearchedResults} options={{headerShown:false}}/>
         <Stack.Screen name='List' component={List} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1D2D44",
  },
})

export default App;

/*const [dataSource] = useState('apple','banana','orange')
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
  }*/

//}

/*return (
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

    </View>*/

{/* your components can stay here like anything */ }
{/* and at the end of view */ }
{
       /* searching &&
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
});*/}