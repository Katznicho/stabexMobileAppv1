import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

const ArrowBack = ({ styles }: any) => {
    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={[{ marginLeft: 10 }, styles]}
        >
            <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
            />
        </TouchableOpacity>
    )
}

export default ArrowBack

