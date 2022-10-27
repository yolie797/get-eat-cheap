import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Image, Button } from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list'
import { Data, Shops } from '../DataAsset/data'
//import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-web';
import { Icon, withBadge } from 'react-native-elements'
import { useRoute } from '@react-navigation/native';
import PuffLoader from "react-spinners/PuffLoader";

let myList = []

const HomePage = ({ navigation }) => {
  const [indexCheck, setIndexCheck] = useState("0");
  const BadgeIcon = withBadge(0)(Icon);
  const [searched, setSearched] = useState([]);
  const [product, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const route = useRoute();

  const handleChange = event => {
    setSearched(event.target.value);
  };

  const passData = async () => {
    setIsLoading(true)
    console.log(route.params.selectLink + searched);
    await fetch(route.params.selectLink + searched)
      .then(respond => {
        return respond.json()
      })
      .then(data => {
        setIsLoading(false)
        setProducts(data.products)

        console.log(data.products);
        navigation.navigate('SearchedResults', { item: data.products })

      })


    console.log(route.params.selectLink + searched);
    console.log('The budget is:', route.params.budget)
  };


  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('List',{'cartList':myList})}>
          <BadgeIcon name="list-alt"
            size={30}
            color="#20DC49"
            style={{ marginBottom: 60, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, color: '#20DC49', fontWeight: 'bold', marginTop: 50, marginLeft: 2 }}>GetEatCheap</Text>

        <Icon
          name="menu"
          size={30}
          color='#20DC49'
          style={{ marginBottom: 60, marginRight: 10 }}
          onPress={()=>navigation.navigate('Profile')}
        />
      </View>

      <View style={styles.borderLine}></View>

      {loading
      ?<View style={{height:'70%', alignItems:'center',justifyContent:'center'}}>
         <PuffLoader
        color={"#20DC49"}
        loading={loading}
        // cssOverride={override}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Text style={{ fontSize: 15, color: '#fff',marginTop:100 }}>
          Please wait while we find the best products for you.</Text>
      
      </View>
      : <>
       <View style={styles.searchBar}>
        <TextInput type="text" placeholder='Search Product' style={styles.searchProduct} onChange={handleChange} />
        <Icon
          name="search"
          size={25}
          color="black"
          style={{ marginLeft: 80 }}
          onPress={passData}
          value={searched}
        />
      </View>

      <View style={styles.searchTab}>
        <View style={styles.leftLine}></View>
        <Text style={{ color: '#20DC49' }}>Popular Searches</Text>
        <View style={styles.rightLine}></View>
      </View>


      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 50, marginLeft: 60, marginRight: 60 }}
          data={Data}
          keyExtractor={(item) => item.id}
          extraData={indexCheck}
          renderItem={({ item, index }) => (
            <View style={styles.popularPics}>
              <Image
                style={{ height: 70, width: 70, borderRadius: 20, backgroundColor: '#fff', marginLeft: 10 }}
                source={item.image}
              />


            </View>

          )}
        />
      </View>

      <View style={styles.searchTab2}>
        <View style={styles.leftLine2}></View>
        <Text style={{ color: '#20DC49' }}>Shops</Text>
        <View style={styles.rightLine2}></View>
      </View>

      <View style={styles.shops}>
        <Image source={require('../assets/shoprite.png')} style={{ width: 80, height: 80, marginLeft: 30, borderRadius: 10 }} />
        <Image source={require('../assets/picknpay.png')} style={{ width: 80, height: 80, borderRadius: 10 }} />
        <Image source={require('../assets/makro.png')} style={{ width: 80, height: 80, marginRight: 30, borderRadius: 10 }} />
      </View>
      </> 
      
      }

      <View style={styles.bottomLine}></View>

      <View style={styles.copyright}>
        <Icon
          name="copyright"
          size={10}
          color='#20DC49'
        />
        <Text style={styles.copyrightTxt}>Copyright GetEatCheap 2022 Terms & Conditions/ Privacy Policy/ Sitemap</Text>
      </View>



    </View>
  )
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2D44",
    flex: 1,
    justifyContent: "center",
  },
  nav: {
    width: '100%',
    height: '10%',
    marginTop: -50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginTop: 25,
  },
  searchBar: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    height: '6%',
    marginTop: '17%',
    marginBottom: '8%',
    marginLeft: '15%',
    borderColor: '#20DC49',
    borderWidth: 2,
    borderRadius: 15,
  },
  leftLine: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 150,
  },
  rightLine: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 150,
  },
  searchTab: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  popularPics: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  searchTab2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  leftLine2: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 185,
  },
  rightLine2: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    width: 185,
  },
  shops: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    marginBottom: 20
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginTop: 50
  },
  copyright: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  copyrightTxt: {
    fontSize: 10,
    color: '#20DC49'
  }


})