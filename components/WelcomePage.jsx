import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list'

const welcomePage = () => {
    const [selected, setSelected] = React.useState("");
    const data = [
        { key: '1', value: 'ShopRite' },
        { key: '2', value: 'PicknPay' },
        { key: '3', value: 'Spar' },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <Text style={styles.navWelcome}>Welcome</Text>
                <Text style={styles.TextWelcome}>Enter Budget and Select Shop</Text>
                <View style={styles.line}></View>
                <View style={styles.line2}></View>
            </View>
            <View>
                <TextInput style={styles.textBudget} placeholder="Enter Budget" />
            </View>
            <View style={styles.dropShop}>
                <SelectList boxStyles={{ backgroundColor: 'white', borderColor: '#20DC49', marginTop: '10%', color: '#20DC49', borderWidth: 2 }}
                    dropdownStyles={{ backgroundColor: '#fff' }} placeholder="Select Shop" data={data} setSelected={setSelected} />
            </View>
            <View style={styles.btnCont}>
                {/*<Button title="Proceed" style={styles.proceedBtn}></Button> */}
                <TouchableOpacity style={styles.proceedBtn}>Proceed</TouchableOpacity>
            </View>
            <View style={styles.bottomLn}></View>
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
export default welcomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: '80%',


    },
    navigator: {
        marginTop: -450,
        marginBottom: 60,
        alignItems: 'center'
    },
    navWelcome: {
        color: '#20DC49',
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 150,
    },
    TextWelcome: {
        color: '#20DC49',
        fontSize: 15,
        marginTop: 30,
    },
    textBudget: {
        backgroundColor: '#fff',
        width: '70%',
        height: 50,
        marginLeft: '15%',
        borderColor: '#20DC49',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
    },
    dropShop: {
        width: '70%',
        height: 50,
        marginLeft: '15%',
        borderColor: '#20DC49',
        marginBottom: '5%',
    },
    line: {
        width: '25%',
        borderTopWidth: 2,
        borderTopColor: '#fff',
        marginEnd: '75%',
    },
    line2: {
        width: '25%',
        borderTopWidth: 2,
        borderTopColor: '#fff',
        marginStart: '75%',
    },
    proceedBtn: {
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#20DC49',
        width: '40%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    btnCont: {
        marginTop: 145,
        marginLeft: '30%',
        width: '100%'
    },
    copyright:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30,
      },
      copyrightTxt:{
        fontSize:10,
        color:'#20DC49'
      },
      bottomLn: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginTop: 200,
      }



});
