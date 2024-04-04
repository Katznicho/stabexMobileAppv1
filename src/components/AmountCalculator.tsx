import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { generalStyles } from '../screens/utils/generatStyles';
import { calculateDistance, formatCurrency } from '../screens/utils/helpers/helpers';
import { useApi } from '../hooks/useApi';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { StyleSheet } from 'react-native';

const AmountCalculator = ({ selectedDeliveryAddress, deliveryOption, setDeliveryCharge, deliveryCharge }: any) => {
    const { cartList, station } = useSelector((state: RootState) => state.cart);
    const totalPrice = cartList.reduce((acc: number, item: any) => acc + item.unit_price * item.quantity, 0);
    const { position } = useGetUserLocation();


    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: `getDeliveryZoneWithCharges/${station.id}`,
        params: { "account": "hasWalletAccount" },
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });

    useEffect(() => {
        if (selectedDeliveryAddress && deliveryOption === "Home Delivery") {
            const totalDistance = calculateDistance(station?.latitude, station?.longitude, selectedDeliveryAddress?.latitude, selectedDeliveryAddress?.longitude);
            if (data && data.deliveryZone && data.deliveryZone.delivery_zone_charges) {
                const charges = data.deliveryZone.delivery_zone_charges;
                let deliveryCharge = 0;
                for (const charge of charges) {
                    const minDistance = parseFloat(charge.min_distance);
                    const maxDistance = parseFloat(charge.max_distance);
                    if (totalDistance >= minDistance && totalDistance <= maxDistance) {
                        deliveryCharge = parseFloat(charge.charge);
                        break;
                    }
                }
                setDeliveryCharge(deliveryCharge);
            }
        } else {
            setDeliveryCharge(0); // Reset delivery charge to 0 if delivery option is not "Home Delivery"
        }
    }, [selectedDeliveryAddress, deliveryOption, data]);


    return (
        <View>
            <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[generalStyles.CardTitle]}>Purchase Cost</Text>
                <Text style={[generalStyles.CardTitle]}>{formatCurrency(totalPrice)}</Text>
            </View>
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[generalStyles.CardTitle]}>Delivery Cost</Text>
                <Text style={[generalStyles.CardTitle]}>UGX {deliveryOption === "Home Delivery" ? deliveryCharge : 0}</Text>
            </View>

            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[generalStyles.CardTitle]}>Total Cost</Text>
                <Text style={[generalStyles.CardTitle]}>{formatCurrency(totalPrice + deliveryCharge)}</Text>
            </View>
            <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
        </View>
    );
};

export default AmountCalculator;

const styles = StyleSheet.create({
    hairLineStyles: { width: "100%", marginHorizontal: 0 },
});
