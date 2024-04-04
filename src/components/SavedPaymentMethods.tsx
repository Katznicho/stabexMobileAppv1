import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import PaymentCard from './PaymentCard';

const PaymentList = [
    {
        name: 'Airtel',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gatG0jIL1ybYTW5-1kCsT6iKKcMtiB_FJpKkxZotaA&s",
        text: "Pay with 0759983853"
    },
    {
        name: 'MTN',
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg",
        text: "Pay with 0759983853"

    },
    {
        name: 'Mpesa',
        image: "https://www.nopcommerce.com/images/thumbs/0019616_lipanampesa.png",
        text: "Pay with 0759983853"
    }
];

const SavedPaymentMethods: React.FC = ({ amount }: any) => {

    const navigation = useNavigation<any>();

    return (
        <ScrollView>
            <View style={[generalStyles.formContainer]}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Saved Payment Methods
                    </Text>
                </View>
            </View>
            {/* payment methods */}
            {
                PaymentList.map((item: any, index: number) => {
                    return (
                        <PaymentCard key={index} 
                        data={item}
                         />
                    );
                })
            }
            {/* payment methods */}
        </ScrollView>
    )
}

export default SavedPaymentMethods

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        elevation: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLORS.secondaryLightGreyHex
    }
})