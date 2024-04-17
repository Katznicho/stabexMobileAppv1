import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { usePostQuery } from '../../hooks/usePostQuery'
import { generalStyles } from '../utils/generatStyles'
import { COLORS } from '../../theme/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const SavedAddresses = () => {
    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: 'api/Orders/MyDeliveryAddresses',
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })

     console.log('=============')
     console.log(data)
     console.log('===============')
     const navigation  = useNavigation<any>();
  return (
    <KeyboardAwareScrollView
    style={[ generalStyles.ScreenContainer]}
    keyboardShouldPersistTaps="always"
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100, backgroundColor: COLORS.primaryLightWhiteGrey }}
      keyboardShouldPersistTaps="always"
    >
                         {/* add delivery address */}
                         <View>
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        activeOpacity={1}

                        onPress={() => {
                           return  navigation.navigate('AddAddress')
                            // return setOpenPicker(false);
                        }}
                    >
                        <Text style={generalStyles.loginText}>{'Add Delivery Address'}</Text>
                    </TouchableOpacity>

                </View>
                {/* add delivery address */}
                 <View>
                 <View style={[generalStyles.viewStyles, generalStyles.centerContent]}>
                        <Text style={generalStyles.CardTitle}>Saved Addresses</Text>
                    </View>
                 </View>
                 <View>
                 {
                        data?.data?.length > 0 ? data?.data?.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    
                                    style={{
                                        ...generalStyles.flexStyles,
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderColor: COLORS.primaryBlackHex,
                                        borderRadius: 10,
                                        padding: 10,
                                        backgroundColor: COLORS.primaryBlackHex,
                                        // elevation: 10,
                                        marginVertical: 10,
                                        marginHorizontal: 10
                                    }}

                                >
                                    <View style={[generalStyles.flexStyles , {padding:5}]}>
                                        <Entypo
                                            name="location-pin"
                                            size={25}
                                            color={COLORS.primaryOrangeHex}
                                        />
                                        <View>
                                            <Text style={[generalStyles.CardSubtitle, { textTransform: 'capitalize', fontWeight: "bold" }]}>{item.address_type}</Text>
                                            <Text style={[generalStyles.CardSubtitle]}>{item.address}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }) : <View style={[generalStyles.centerContent]}>
                            <Text style={generalStyles.CardSubtitle}>No Saved Addresses</Text>
                        </View>
                    }
                 </View>
      
      {/* profile details */}
    </ScrollView>
  </KeyboardAwareScrollView>
  )
}

export default SavedAddresses

const styles = StyleSheet.create({
    buttonStyles: {
        width: "95%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
})