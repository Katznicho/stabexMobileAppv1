import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../../theme/theme';
import LocationFinder from '../../components/LocationFinder';
import HomeDeliveryPlace from '../../components/Modals/HomeDeliveryPlace';
import { generalStyles } from '../utils/generatStyles';


const DeliveryLocation = () => {

    const [location, setLocation] = useState<any>({ lat: 0, lng: 0 })
    const [openPicker, setOPenPicker] = useState<boolean>(true)

    return (<View style={[generalStyles.ScreenContainer]}>
        <LocationFinder />
        <HomeDeliveryPlace
            openPicker={openPicker}
            setOpenPicker={setOPenPicker}
        />

    </View>
    )
}

export default DeliveryLocation

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 5,
        width: "100%"

    },
    InputContainerComponent: {
        flexDirection: 'row',
        marginHorizontal: SPACING.space_10,
        marginVertical: SPACING.space_10,
        // borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
    },

})