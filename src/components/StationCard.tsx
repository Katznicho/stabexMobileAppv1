import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { generalStyles } from '../screens/utils/generatStyles';
import { calculateDistance } from '../screens/utils/helpers/helpers';
import Entypo from 'react-native-vector-icons/Entypo';

const StationCard: React.FC<any> = React.memo(({ data, position }: any) => {
    const navigation = useNavigation<any>();


    // const distance = useMemo(() => {
    //     return calculateDistance(position?.latitude, position?.longitude, parseFloat(data?.lat), parseFloat(data?.lon));
    // }, [position, data?.lat, data?.lon]);



    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container]}
            onPress={() => navigation.navigate('StationDetails', { data, position })}
        >
            <Text style={[generalStyles.CardTitle, { marginHorizontal: 10, fontSize: 18 }]}>
                {data?.station_code ?? data?.station_code ?? "Stabex Station"}
            </Text>
            <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: "center" }]}>
                <Entypo name="location-pin" color={COLORS.primaryOrangeHex} size={20} />
                <Text style={[generalStyles.CardSubtitle, { marginHorizontal: 0, fontSize: 15 }]}>
                    {10} kms
                </Text>
            </View>
        </TouchableOpacity>
    );
});

export default StationCard;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10
    }
});
