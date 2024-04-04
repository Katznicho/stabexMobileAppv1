import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, } from '../theme/theme';
import QRCode from 'react-native-qrcode-svg';
import { generalStyles } from '../screens/utils/generatStyles';

const CardBackGroundImage: React.FC<any> = ({ card }: any) => {
    return (
        <View style={styles.container}>
            <View style={[styles.viewStyles, generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <View >
                    <Image
                        source={require("../assets/app_images/stabex_logo.jpg")}
                        style={styles.imageStyles}
                    />
                </View>

                <View style={styles.qrCodeViewStyles}>
                    <QRCode
                        value={card?.card?.card_number}
                        size={80}
                    />
                </View>
            </View>

            <View style={[styles.viewStyles]}>
                <Text style={[generalStyles.CardTitle, styles.textStyles]}>STABEX CUSTOMER</Text>
            </View>

            <View style={[styles.viewStyles, generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>

                <View style={[styles.viewStyles, styles.boxStyles, { backgroundColor: COLORS.primaryRedHex }]}>

                </View>

                <View style={[styles.boxStyles, { width: 40 }]}>

                </View>

                <View>
                    <Text style={[generalStyles.CardTitle, {
                        color: COLORS.primaryRedHex,
                        fontSize: FONTSIZE.size_18,
                        fontFamily: FONTFAMILY.poppins_medium,
                        fontWeight: "bold",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 1.5

                    }]}>{card?.card?.card_number}</Text>
                </View>
            </View>

        </View>
    )
}

export default CardBackGroundImage

const styles = StyleSheet.create({

    container: {
        marginVertical: 10,
        marginHorizontal: 15,
        marginRight: 20,
        elevation: 5,
        height: 220,
        borderRadius: 10,
        width: "92%",
        backgroundColor: COLORS.primaryBlackHex
        // borderRadius: BORDERRADIUS.radius_20
    },
    imageStyles: {
        width: 100,
        height: 80
    },
    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    qrCodeViewStyles: {
        borderWidth: 2,
        borderColor: COLORS.primaryRedHex,
        padding: 5,
        // borderRadius: 10
    },
    textStyles: {
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        alignSelf: "center"
    },
    boxStyles: {
        height: 25,
        borderRadius: 5,
        width: 50,
        backgroundColor: COLORS.primaryOrangeHex
    }
})

//