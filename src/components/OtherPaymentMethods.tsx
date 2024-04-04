import { Text, View, ScrollView } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import PaymentCard from './PaymentCard';

const PaymentList = [
    {
        name: 'Airtel',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gatG0jIL1ybYTW5-1kCsT6iKKcMtiB_FJpKkxZotaA&s",
        text: "Payments are made using Airtel"
    },
    {
        name: 'MTN',
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg",
        text: "Payments are made using MTN"

    },
    {
        name: 'Mpesa',
        image: "https://www.nopcommerce.com/images/thumbs/0019616_lipanampesa.png",
        text: "Payments are made using Mpesa"
    }
];

const OtherPaymentMethods: React.FC = () => {

    const navigation = useNavigation<any>();
    return (
        <ScrollView>
            <View style={[generalStyles.formContainer]}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Other Payment Methods
                    </Text>
                </View>
            </View>
            {/* payment methods */}
            {
                PaymentList.map((item: any, index: number) => {
                    return (
                        <PaymentCard key={index} data={item} />
                    );
                })
            }
            {/* payment methods */}
        </ScrollView>
    )
}

export default OtherPaymentMethods

