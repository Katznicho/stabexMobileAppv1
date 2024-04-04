import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useShowGreeting } from '../hooks/useShowGreetings';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {

  const navigation = useNavigation<any>();
  const greetings = useShowGreeting();

  return (
    <SafeAreaView style={styles.HeaderContainer}>
      <View style={styles.viewContainer}>

        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
        >
          <Entypo
            name="menu"
            color={COLORS.primaryBlackHex}
            size={30}
          />

        </TouchableOpacity>

        <View style={styles.centerView}>
          <Text style={styles.HeaderText}>{greetings}</Text>
        </View>

        <View style={styles.centerView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    // padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
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

export default HeaderBar;
