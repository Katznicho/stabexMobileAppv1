import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS } from '../theme/theme'

type Props = {
    amounts: string[]
    amount: string,
    setAmount: Dispatch<SetStateAction<string>>;
}
const AmountScroller: React.FC<Props> = ({ amounts, amount, setAmount }: Props) => {
    return (
        <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                {amounts?.map(
                    (item: any, index: number) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                key={index}
                                style={[
                                    generalStyles.centerContent,
                                    {
                                        marginHorizontal: 5,
                                        borderWidth: 0,
                                        borderRadius: 20,
                                        // width: 100,
                                        paddingHorizontal: 8,
                                        marginVertical: 10,
                                        height: 40,
                                        backgroundColor:
                                            item == amount
                                                ? COLORS.primaryOrangeHex
                                                : COLORS.primaryLightGreyHex,
                                    },
                                ]}
                                onPress={() => {
                                    setAmount(item)
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            color: COLORS.primaryBlackHex,
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        },
                                    ]}
                                >
                                    UGX  {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                )}
            </ScrollView>
        </View>
    )
}

export default AmountScroller

