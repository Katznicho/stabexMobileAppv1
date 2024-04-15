import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ArrowBack from './ArrowBack';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const StationFinderHeader = () => {
    const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.HeaderContainer}>
    <View style={styles.viewContainer}>
     <ArrowBack/>
      <View style={styles.centerView}>
        <Text style={styles.titleText}>Stations</Text>
      </View>
    </View>
  </SafeAreaView>
  )
}

export default StationFinderHeader

const styles = StyleSheet.create({
    HeaderContainer: {
      backgroundColor: COLORS.primaryOrangeHex
    },
    viewContainer: {
      paddingHorizontal: SPACING.space_18,
      paddingVertical: SPACING.space_10,
  
    },
    HeaderText: {
      fontFamily: FONTFAMILY.poppins_light,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryBlackHex,
    },
    centerView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      color: COLORS.primaryBlackHex,
      fontSize: FONTSIZE.size_20,
      fontFamily: FONTFAMILY.poppins_medium
  
    }
  });