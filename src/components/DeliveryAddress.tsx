import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { generalStyles } from '../screens/utils/generatStyles'
import DeliveryAddressModal from './Modals/DeliveryAddressModal'
import { usePostQuery } from '../hooks/usePostQuery'



const DeliveryAddress = ({ selectedDeliveryAddress, setSelectedDeliveryAddress, openDeliveryPicker, setOpenDeliveryPicker }: any) => {
    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: 'api/Orders/MyDeliveryAddresses',
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })




    return (
        <View style={[generalStyles.viewStyles]}>
            {selectedDeliveryAddress ? (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setOpenDeliveryPicker(true)}
                    style={[generalStyles.flexStyles, { alignItems: "center" }]}>
                    <View>
                        <Image
                            source={require('../assets/app_images/delivery_address.jpeg')}
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={[generalStyles.CardTitle, { textTransform: 'capitalize', fontWeight: "bold" }]}>{selectedDeliveryAddress?.address_type}</Text>
                        <Text style={[generalStyles.CardSubtitle]}>{selectedDeliveryAddress?.address}</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.flexStyles, { alignItems: "center" }]} onPress={() => setOpenDeliveryPicker(true)}>
                    <View>
                        <Image
                            source={require('../assets/app_images/delivery_address.jpeg')}
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                        />
                    </View>
                    <View>
                        <Text style={[generalStyles.CardTitle]}>{data?.data?.length > 0 ? 'Select Delivery Address' : 'Add Delivery Address'}</Text>
                        <Text style={[generalStyles.CardSubtitle]}>Tap here {data?.data?.length > 0 ? 'to select' : 'to add'} address</Text>
                    </View>
                </TouchableOpacity>
            )}
            <DeliveryAddressModal
                openPicker={openDeliveryPicker}
                setOpenPicker={setOpenDeliveryPicker}
                deliveryAddress={data?.data}
                selectedDeliveryAddress={selectedDeliveryAddress}
                setSelectedDeliveryAddress={setSelectedDeliveryAddress}
            />
        </View>
    )
}


export default DeliveryAddress

const styles = StyleSheet.create({})