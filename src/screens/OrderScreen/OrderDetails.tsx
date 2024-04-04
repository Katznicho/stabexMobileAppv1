import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OrderDetails = () => {

    const { item } = useRoute<any>().params;

    console.log("======item============")
    console.log(item)
    console.log("=================")

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: 10 }}
                keyboardShouldPersistTaps="always"
            >
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                    <View>
                        <Text style={generalStyles.CardTitle} >Client Name</Text>
                        <Text style={generalStyles.CardSubtitle}>{item?.ApplicationUser?.FirstName} {item?.ApplicationUser?.LastName}</Text>
                    </View>
                    <View>
                        <Text style={generalStyles.CardTitle} >Company</Text>
                        <Text style={generalStyles.CardSubtitle}>
                            {item?.ApplicationUser?.Company}
                        </Text>
                    </View>

                </View>

                <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                    <View>
                        <Text style={generalStyles.CardTitle} >Order Type</Text>
                        <Text style={generalStyles.CardSubtitle}>{item?.order_type}</Text>
                    </View>
                    <View>
                        <Text style={generalStyles.CardTitle} >Status</Text>
                        <Text style={generalStyles.CardSubtitle}>
                            {item?.order_status}
                        </Text>
                    </View>

                </View>



            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    hairLineStyles: {
        width: "80%",
        marginVertical: 10
    },
})