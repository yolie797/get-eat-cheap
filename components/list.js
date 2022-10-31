import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from 'react-native-vector-icons';
import { Data } from '../DataAsset/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBudget, getSelectedList, getStoreImg } from '../DataAsset/data';
import { MaterialIcons } from '@expo/vector-icons'; 
// import img1 from '../assets/break.jpg'
// import img2 from '../assets/maize.jpg'
// import img3 from '../assets/rice.jpg'
// import img4 from '../assets/cooking oil.jpg'

const List = ({ route, navigation }) => {
    const selectedList = route.params.cartList
    const [list, setList] = useState([])


    const [quantity, setQuantity] = useState(1)
    const imageStore = getStoreImg()
    let budget = 0
    budget = getBudget()
    let totalQuantity = 0;
    let totalPrice = 0;
    const increment = () => {
        setQuantity(quantity + 1);
    }
    const decrement = () => {
        setQuantity(quantity - 1);
    }
    const removeItem = async () => {
        try {
            await AsyncStorage.removeItem('@storage_Key');
            console.log('Data removed')
        }
        catch (exception) {
            console.log(exception)
        }

    }
    const addQtyProduct = async (product, selectedQty, selectedIndex) => {
        let newqty = selectedQty + 1
        console.log(selectedQty);

        setList(current => current.map((obj, i) => i === selectedIndex
            ? { ...obj, value: product, qty: newqty }
            : obj))

    }

    const removeQtyProduct = async (product, selectedQty, selectedIndex) => {
        let newqty = selectedQty - 1
        console.log(selectedQty);

        setList(current => current.map((obj, i) => i === selectedIndex
            ? { ...obj, value: product, qty: newqty }
            : obj))
    }

    useEffect(() => {
        getData().then((res) => {
            // shoppingList.push(res)

            console.log('====================================');
            console.log(res);
            setList(res)

            console.log('====================================');
        })
        console.log('====================================');
        console.log(selectedList);
        console.log('====================================');
        // showList = shoppingList[0]
        // console.log(showList);
    }, [])
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')

            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    if (list != null) {
        console.log(list);
        list.forEach((item) => {

            totalQuantity += item.qty;
            totalPrice += item.qty * item.value.price;

        }, 0)
    }

    const ListItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.cartCard}>
                <AntDesign style={{padding:10}}
                                name='delete'
                                size={20}
                                color={'#20DC49'}
                                onPress={removeItem}
                            />
                     {/* <MaterialIcons onPress={removeItem} name="delete-outline" size={24} color="#20DC49" /> */}
                    <Image source={item.value.image} style={{ height: 80, width: 80 }} />
                    <View style={{ marginLeft: 40, width: 70, height: 40, alignItems: 'center', backgroundColor: '#33517B' }}>
                        <View style={styles.listView2}>
                            <AntDesign name="minuscircleo" size={16} color="#20DC49" onPress={() => removeQtyProduct(item.value, item.qty, index)} />
                            <Text style={{ fontWeight: 'bold', fontSize: 18,padding:5 }}>{item.qty}</Text>
                            <AntDesign name="pluscircleo" size={16} color="#20DC49" marginLeft={10} onPress={() => addQtyProduct(item.value, item.qty, index)} />
                           
                        </View>
                    </View>
                    <View
                        style={{
                            height: 100,
                            marginLeft: 40,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{ fontWeight: '500', fontSize: 12, color: '#20DC49' }}>{item.value.name}</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#20DC49' }}>R{item.value.price}</Text>
                    </View>

                </View>

            </View>
        )
    };
    // const renderItem = ({ item }) => <ListItem title={item.name} price={item.price} image={item.image} />;

    return (

        <View style={styles.container}>
            <View style={styles.nav}>
                <Icon name="home"
                    size={25}
                    color="#20DC49"
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('HomePage')}
                />
            </View>
            <View style={{
                marginTop: 20, alignItems: 'center', flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={styles.leftLine}></View>
                <Text style={styles.searchTxt}>List</Text>
                <View style={styles.rightLine}></View>
            </View>
           
            <Image source={imageStore} style={{ width: 150, height: 80, alignSelf: 'center', marginTop: 20 }} />
           {/* <View style={styles.results_style}>
           <Text style={{ color: '#20DC49' }}>Total Quantity: {totalQuantity}</Text>
                <Text style={{ color: '#20DC49' }}>Total Price: {totalPrice.toFixed(2)}</Text>
                <Text style={{ color: '#20DC49' }}>Budget:{budget}</Text>
                {(totalPrice > budget)
                    ? <Text style={{ color: '#20DC49' }}>Out of budget</Text>
                    : <Text style={{ color: '#20DC49' }}>In Budget</Text>
                }
           </View> */}
            <ScrollView>
                <View style={{ marginBottom: 50 }}>

                    <FlatList
                        data={list}
                        renderItem={ListItem}
                        keyExtractor={item => item._id}
                    />
                </View>
            </ScrollView>
            <View>
                <Text style={{ color: '#20DC49',fontWeight:'bold',fontSize:20 }}>Total Quantity: {totalQuantity}</Text>
                <Text style={{ color: '#20DC49',fontWeight:'bold',fontSize:20 }}>Total Price: {totalPrice.toFixed(2)}</Text>
                <Text style={{ color: '#20DC49',fontWeight:'bold',fontSize:20 }}>Budget:{budget}</Text>
                {(totalPrice > budget)
                    ? <Text style={{ color: 'red' }}>Out Of Budget</Text>
                    : <Text style={{ color: '#20DC49' }}>In Budget</Text>
                }
                <TouchableOpacity style={styles.checkBtn}>Download</TouchableOpacity>
            </View>

        </View>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#1D2D44'

    },
    nav: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    searchTxt: {
        fontSize: 15,
        color: '#20DC49',
        fontWeight: 'bold',
        //marginTop: 140,
    },
    leftLine: {
        borderTopWidth: 1,
        borderTopColor: '#fff',
        width: 140,

    },
    rightLine: {
        borderTopWidth: 1,
        borderTopColor: '#fff',
        width: 140,

    },
    navigator: {
        marginTop: -90,
        marginBottom: 60,
        alignItems: 'center'
    },
    inputNumber: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#33517B',
        padding: 5

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },

    listView2: {
        //display: 'flex', flexDirection: 'row', alignItems: 'center',
        // alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        margin: -1,
        flex: 1,

    },
    details2: {
        color: '#20DC49',
        fontSize: 10,

    },
    details3: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    budget: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#20DC49'
    },
    checkBtn: {
        height: 60,
        width: 180,
        borderWidth: 2,
        borderColor: '#20DC49',
        borderRadius: 5,
        backgroundColor: '#20DC49',
        alignSelf: 'center',
        marginTop: 40,
        justifyContent: 'center',
        textAlign: 'center'

    },
    cartCard: {
        height: 150,
        elevation: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#20DC49',
        backgroundColor: "transparent",
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    results_style:{
        
    }

})