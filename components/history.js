import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View,Image, FlatList, ScrollView } from 'react-native'
import { Icon} from 'react-native-elements'

const History = ({ navigation, route, list }) => {
    const { myList } = route.params;

    const renderItem = ({ item }) => <Item itemData={item} />;

    const Item = ({ itemData }) => (

        <View style={{ backgroundColor: 'transparent', marginTop: 20,marginRight:20,borderWidth:1,borderColor:'#20DC49',borderRadius:15 }} >
            {itemData.map((list) => {
                return (
                    <ScrollView>
                        <View style={{ backgroundColor: '#33517B', margin: 5,flex:3,flexDirection:'row',alignContent:"center", alignItems:'center',justifyContent:'center' }}>
                            <Image
                                style={{ height: '10vh', width: '30vw',flex:1 }}
                                source={list.value.image}
                            />
                            
                            <Text style={{ color: 'white',flex:1,textAlign:'center' }}>{list.qty}</Text>
                            <Text style={{ color: 'white',flex:1 }}>{list.value.name}</Text>
                            
                        </View>
                    </ScrollView>

                )
            }
            )

            }
           
        </View>


    );
    
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Icon name="home"
                    size={25}
                    color="#20DC49"
                    style={{ marginLeft: 20, marginTop: 20 }}
                    onPress={() => navigation.navigate('HomePage')}
                />

                <Text style={styles.searchTxt}>History</Text>
                <View>
        
                </View>
            </View>
            <View style={{ marginTop: -10 }}>
                <View style={styles.leftLine}></View>
                <View style={styles.rightLine}></View>
            </View>
            <ScrollView>
                <View>
                    <SafeAreaView style={styles.content}>
                        <FlatList numColumns={1} data={myList} renderItem={renderItem} keyExtractor={item => item.id} />
                    </SafeAreaView>
                </View>
            </ScrollView>


        </View>
    )
}

export default History;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1D2D44",
        flex: 1,
        justifyContent: "center",
       
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
        marginRight:40
        
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
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginTop: 40,
        flex: 1,

    }
})