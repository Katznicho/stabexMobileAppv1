import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS, FONTSIZE } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

const CategoryTypes = ({ text, screen }: any) => {

    const navigation = useNavigation<any>();

    return (
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }]}>
            <View>
                <Text style={[generalStyles.CardTitle]}>{text}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                // onPress={() => navigation.navigate(screen)}
                style={{
                    backgroundColor: COLORS.primaryOrangeHex,
                    padding: 5,
                    borderRadius: 5
                }}
            >
                <Text style={[generalStyles.CardSubtitle, { color: COLORS.primaryBlackHex, fontSize: FONTSIZE.size_12 }]}>View All</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryTypes

