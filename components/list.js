import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from 'react-native-vector-icons';
import {removeItemProduct } from '../DataAsset/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBudget, getSelectedList, getStoreImg  } from '../DataAsset/data';
import { collection,addDoc } from 'firebase/firestore';
import {db, auth } from './config/firebase';

const List = ({ route, navigation }) => {
    const [list, setList] = useState([])
    const listRef = collection(db,"products")
    const user = auth.currentUser
    let myList = {}
    const [quantity, setQuantity] = useState(1)
    const imageStore = getStoreImg()
    let budget = 0
    budget = getBudget()
    let totalQuantity = 0;
    let totalPrice = 0;

    const removeItem = async (selectedItem) => {
        setList(list.filter(item => item !== selectedItem))
        removeItemProduct(selectedItem)

    }
    const addQtyProduct = async (product, selectedQty, selectedIndex) => {
        let newqty = selectedQty + 1

        setList(current => current.map((obj, i) => i === selectedIndex
            ? { ...obj, value: product, qty: newqty }
            : obj))
    }

    const removeQtyProduct = async (product, selectedQty, selectedIndex) => {
        let newqty = selectedQty - 1

        setList(current => current.map((obj, i) => i === selectedIndex
            ? { ...obj, value: product, qty: newqty }
            : obj))
    }

    useEffect(() => {
        myList = getSelectedList()
        setList(myList)
        
    }, [])

    const getData = async () => {
        setList(getSelectedList())
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
           alert('error occured')
        }
    }

    if (list != null) {
        list.forEach((item) => {

            totalQuantity += item.qty;
            totalPrice += item.qty * item.value.price;

        }, 0)
    }

    const saveList = async() =>{
        if(user !==""){
            if(list !== null){
                try {
                    const docRef = await addDoc(listRef, {
                      list, 
                      email:user.email
                    });
                    alert('Data Saved')
                  } catch (e) {
                    alert('Error saving')
                  } 
            }
        }
    }

    const ListItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.cartCard}>
                    <AntDesign style={{ padding: 10 }}
                        name='delete'
                        size={20}
                        color={'#20DC49'}
                        onPress={() => removeItem(item)}
                    />
                    <Image source={item.value.image} style={{ height: 80, width: 80 }} />
                    <View style={{ marginLeft: 40, width: 70, height: 40, alignItems: 'center', backgroundColor: '#33517B' }}>
                        <View style={styles.listView2}>
                            <AntDesign name="minuscircleo" size={16} color="#20DC49" onPress={() => removeQtyProduct(item.value, item.qty, index)} />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5 }}>{item.qty}</Text>
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
            <View style={{ flexDirection: 'row', backgroundColor: '#33517B', borderRadius: 15, padding: 15, margin: 15 }} >
                <View style={{ alignContent: 'center', flexDirection: 'row', justifyContent: 'space-evenly', display:'flex' }}>
                    <View style={{flex:2}}>
                        <Text style={{ color: '#fff' }}>Total Items On your list: {totalQuantity}</Text>
                        <Text style={{ color: '#fff' }}>Total Price : R<span style={{ color: '#fff' }}>{totalPrice.toFixed(2)}</span> </Text>
                        <Text style={{ color: '#fff' }}>Your Budget is :R<span style={{ color: '#fff' }}>{budget}</span></Text>
                    </View>
                    <View style={{justifyContent:'flex-end', flex:1, width:150}}>
                        {(totalPrice > budget)
                            ? <View style={{ backgroundColor: '#FFBDBA', padding: 5, textAlign: 'center' }}><Text style={{ color: 'red' }}>You are Out Of Budget </Text></View>
                            : <View style={{ backgroundColor: '#C6F4C8', padding: 5, textAlign: 'center' }}><Text style={{ color: 'green' }}>You are In Budget</Text></View>
                        }
                    </View>

                </View>

            </View>
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
                <TouchableOpacity onPress={() =>saveList()} style={styles.checkBtn2}>Save</TouchableOpacity>
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
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center'

    },
    checkBtn2: {
        height: 60,
        width: 150,
        borderWidth: 2,
        borderColor: '#20DC49',
        borderRadius: 5,
        backgroundColor: '#20DC49',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom:40
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

    results_style: {

    }

})