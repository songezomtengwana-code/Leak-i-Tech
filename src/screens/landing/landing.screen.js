import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
// import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

const navigation = useNavigation();

export default function LandingScreen() {

    return (
        <View style={{ backgroundColor: "#FFF", height: "100%", }}>

            <View style={{ flex: 0.1, }}></View>

            <Image
                source={require("../images/bridge.jpg")}
                style={{ 
                    flexDirection: "center",
                    width: "80px",
                    height: "65px",
                }}
            />
            <Text style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "bold",
            }}>Add Request</Text>

            <View style={{
                marginHorizontal: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                // backgroundColor:"#00716F",
                paddingVertical: 10,
                borderColor: "#004AAD",
                borderWidth: "1px",


            }}>
                <Text onPress={() => navigate('Link_WS')} style={{
                    color: "black",
                    fontFamily: "SemiBold"
                }}>Water and Sanitation</Text>
            </View>
            <View style={{
                marginHorizontal: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                paddingVertical: 10,
                borderColor: "#004AAD",
                borderWidth: "1px",

            }}>
                <Text onPress={() => navigate('Add')} style={{
                    color: "black",
                    fontFamily: "SemiBold"
                }}>Electricity</Text>
            </View>
            <View style={{
                marginHorizontal: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                paddingVertical: 10,
                borderColor: "#004AAD",
                borderWidth: "1px",

            }}>
                <Text onPress={() => navigate('Link_TS')} style={{
                    color: "black",
                    fontFamily: "SemiBold"
                }}>Transport</Text>
            </View>

            <View onPress={() => navigate('Register')} style={{
                marginHorizontal: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                backgroundColor: "red",
                paddingVertical: 10,

            }}>
                <Text style={{
                    color: "white",
                    fontFamily: "SemiBold"
                }}>Back</Text>
            </View>

        </View>
    )
}
