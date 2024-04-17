import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import Entypo from "react-native-vector-icons/Entypo";
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import call from 'react-native-phone-call'


const ProfileDetailsCard = () => {
    const { isGuest } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<any>()


    const handleShareApp = async () => {

        try {
            const result = await Share.open({
                title: 'Install Reuse App',
                message: 'Check out Stabex App and install it',
                url: 'https://play.google.com/apps/internaltest/4699919634175995763',
            });
        } catch (error) {

        }
    }

    const navigation = useNavigation<any>()

    const handleSignOut = async () => {
        try {

            // Handle any additional actions after the user is signed out
            // await logout();         
        }

        catch (error) {
        }
    }

    const onMakeCall = () => {

        const args = {
            number: '256759983853', // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch(console.error);
    }

    const onSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },

                {
                    text: 'OK',
                    onPress: () => handleSignOut(),
                },
            ],
            { cancelable: false },
        );
    };

    

    return (
        <View>
            {/* account settings */}
             {
                !isGuest &&(
                    <View>
                    <View style={[generalStyles.viewStyles]}>
                        <Text style={[generalStyles.CardTitle, styles.titleStyle]}>Account Settings</Text>
                    </View>
                    
                    <View style={[styles.viewContainer]}>
    
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() =>navigation.navigate("EditProfile")}
                            style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                        >
                            <View style={{ flex: 0.1 }}>
                                <MaterialCommunityIcons
                                    name="account"
                                    size={25}
                                />
    
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Text style={[styles.textStyle]}>Account Information</Text>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                                <Entypo
                                    name="chevron-right"
                                    size={28}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() =>navigation.navigate("SavedAddresses")}
                            style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                        >
                            <View style={{ flex: 0.1, marginLeft: 5 }}>
                                <FontAwesome
                                    name="lock"
                                    size={25}
                                />
    
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Text style={[styles.textStyle]}>Saved Addresses </Text>
                            </View>
                            <View style={{ flex: 0.1 }}>
                                <Entypo
                                    name="chevron-right"
                                    color={COLORS.primaryWhiteHex}
                                    size={28}
                                />
                            </View>
                        </TouchableOpacity>
    
                    </View>
                </View>
                )
             }

            {/* account settings */}

            {/* information center */}
            <View>
                <View style={[generalStyles.viewStyles]}>
                    <Text style={[generalStyles.CardTitle, styles.titleStyle]}>Information Center</Text>
                </View>
                <View style={[styles.viewContainer]}>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>navigation.navigate("AboutUs")}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1 }}>
                            <AntDesign
                                name="infocirlceo"
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>About Us</Text>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>navigation.navigate("PrivatePolicy")}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <FontAwesome
                                name="lock"
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Frequently Asked Questions</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => handleShareApp()}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <Entypo
                                name="share"
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Invite Friends</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            {/* information center */}

            {/* get in touch */}
            <View>
                <View style={[generalStyles.viewStyles]}>
                    <Text style={[generalStyles.CardTitle, styles.titleStyle]}>Get in Touch</Text>
                </View>

                <View style={[styles.viewContainer]}>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>onMakeCall()}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1 }}>
                            <Ionicons
                                name="call-outline"
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Call Us</Text>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>Linking.openURL(`mailto:info@stabex.com`)}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <EvilIcons
                                name="envelope"
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Email</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>


                </View>
            </View>

            {/* get in touch */}

            {/* social media */}
            <View>
                <View style={[generalStyles.viewStyles]}>
                    <Text style={[generalStyles.CardTitle, styles.titleStyle]}>Social Media</Text>
                </View>
            </View>
            <View style={[styles.viewContainer]}>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => Linking.openURL('https://stabexinternational.com/')}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1 }}>
                            <Feather
                                name="globe"
                                color={COLORS.primaryOrangeHex}
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Website</Text>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>Linking.openURL('https://www.facebook.com/stabexinternational')}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <Entypo
                                name="facebook-with-circle"
                                color={"blue"}
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Facebook</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>Linking.openURL('https://www.instagram.com/stabexintl/')}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <AntDesign
                                name="instagram"
                                color={"#405DE6"}
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Instagram</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>Linking.openURL('https://twitter.com/stabexintl')}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <AntDesign
                                name="twitter"
                                color={'blue'}
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>X (fomerly Twitter)</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>Linking.openURL('https://www.youtube.com/channel/UCY0bYjy9dJf6kP6OQHx9W4g')}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.containerStyle, styles.bottomLine]}
                    >
                        <View style={{ flex: 0.1, marginLeft: 5 }}>
                            <Entypo
                                name="youtube"
                                color={'red'}
                                size={25}
                            />

                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={[styles.textStyle]}>Youtube</Text>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <Entypo
                                name="chevron-right"
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            {/* social media */}
        </View>

    );
};

export default ProfileDetailsCard;

const styles = StyleSheet.create({
    viewContainer: {
        elevation: 0,
        backgroundColor: COLORS.primaryBlackHex,
    },
    containerStyle: {
        backgroundColor: COLORS.primaryBlackHex,
        // elevation: 5,
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    textStyle: {
        fontFamily: FONTFAMILY.Lovato_Regular,
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
    },
    bottomLine: { borderWidth: 0.5, borderColor: COLORS.secondaryLightGreyHex },
    titleStyle: {
        padding: 10
    }
});
