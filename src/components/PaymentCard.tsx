import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

const PaymentCard: React.FC<any> = ({ data, selectedPaymentMethod, setSelectedPaymentMethod }: any) => {

    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[
                generalStyles.formContainer,
            ]}
            // onPress={() => navigation.navigate('PaymentSummary', { data })}
            onPress={() => setSelectedPaymentMethod(data.name)}
        >
            <View
                style={[
                    generalStyles.flexStyles,
                    styles.cardContainer,
                    {
                        alignItems: 'center',
                        backgroundColor: selectedPaymentMethod === data.name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex,
                        // selectedPaymentMethod === data.name ? { backgroundColor: COLORS.primaryGreenHex } : {},
                    }
                ]}
            >
                <View>
                    <Image
                        source={{ uri: data.image }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10
                        }}
                    />
                </View>
                <View
                    style={[
                    ]}
                >
                    <Text
                        style={[
                            generalStyles.CardTitle,
                            { marginHorizontal: 10, fontSize: 18, color: COLORS.primaryBlackHex }

                        ]}
                    >
                        {data.name}
                    </Text>
                    <Text
                        style={[
                            generalStyles.CardSubtitle,
                            { marginHorizontal: 10, fontSize: 15, color: COLORS.primaryBlackHex }
                            ,
                        ]}
                    >
                        {data.name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

export default PaymentCard

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // backgroundColor: COLORS.primaryBlackHex,
        // backgroundColor: COLORS.primaryGreyHex,
        elevation: 5,
        borderRadius: 10,
        // borderWidth: 0.5,
        // borderColor: COLORS.secondaryLightGreyHex
    }
})