import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { generalStyles } from '../screens/utils/generatStyles';
import { calculateDistance } from '../screens/utils/helpers/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/dev';
import { storeSelectedStation } from '../redux/store/slices/CartSlice';

const StationListCard: React.FC<any> = React.memo(({ data, position, screen }: any) => {
    const navigation = useNavigation<any>();

    const dispatch = useDispatch<AppDispatch>();

    const distance = useMemo(() => {
        return calculateDistance(position?.latitude, position?.longitude, parseFloat(data?.latitude), parseFloat(data?.longitude));
    }, [position, data?.latitude, data?.longitude]);

    // const distance = useMemo(() => {
    //     // Check if position latitude and longitude are not null
    //     if (position?.latitude !== null && position?.longitude !== null) {
    //         // Check if data latitude and longitude are not null
    //         if (data?.latitude !== null && data?.longitude !== null) {
    //             return calculateDistance(position.latitude, position.longitude, parseFloat(data.latitude), parseFloat(data.longitude));
    //         } else {
    //             // Handle case where data latitude or longitude is null
    //             return 0; // or return any other default value
    //         }
    //     } else {
    //         // Handle case where position latitude or longitude is null
    //         return 0; // or return any other default value
    //     }
    // }, [position, data?.latitude, data?.longitude]);

    // console.log("========distance============")
    // console.log(distance(position?.latitude, position?.longitude, parseFloat(data?.latitude), parseFloat(data?.longitude)))
    
    

    return (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.container]}
                onPress={() => {
                    dispatch(storeSelectedStation(data))
                    return navigation.navigate(screen, { data, station: data, position })
                }}
            >
                <View>
                    <Text style={[generalStyles.CardTitle, { marginHorizontal: 10, fontSize: 18 }]}>
                        {data?.station_code ?? data?.station_code ?? "Stabex Station"}
                    </Text>

                </View>

                <View style={[generalStyles.flexStyles]}>
                    <Entypo name="location-pin" color={COLORS.primaryOrangeHex} size={20} />
                    <Text style={[generalStyles.CardSubtitle, { marginHorizontal: 0, fontSize: 15 }]}>
                        {distance} kms
                    </Text>
                </View>
            </TouchableOpacity >
            <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

        </View>

    );
});

export default StationListCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primaryLightWhiteGrey,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 2,
        marginHorizontal: 10
    },
    hairLineStyles: {
        width: "90%",
        marginHorizontal: 0,
        borderBottomWidth: 0.5,
        color: COLORS.primaryLightWhiteGrey

        // marginHorizontal: 40,
        //marginVertical: 10

    },
});