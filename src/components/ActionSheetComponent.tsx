import { StyleSheet, View, Text } from 'react-native';
import { ActionSheet } from 'react-native-ui-lib'
import React from 'react'
import { useDispatch } from 'react-redux';
import { showAuthScreen } from '../redux/store/slices/UserSlice';
import { generalStyles } from '../screens/utils/generatStyles';

const ActionSheetComponent = ({ visible, setVisible }: any) => {

    const dispatch = useDispatch<any>()
    const onPressLogin = () => {
        dispatch(showAuthScreen(true))
    }
    return (
        <View>
            <ActionSheet
                renderTitle={
                    () => (
                        <View>
                            <View style={[generalStyles.viewStyles]}>
                                <Text style={generalStyles.CardTitle}>
                                    Please Login or Register
                                </Text>
                            </View>

                        </View>
                    )
                }

                options={[
                    {
                        label: 'Login',
                        color: 'green',
                        backgroundColor: 'white',
                        onPress: () => onPressLogin(),

                    },
                    {
                        label: 'Register',
                        color: 'green',
                        backgroundColor: 'white',
                        onPress: () => onPressLogin(),

                    },
                    {
                        label: 'Cancel',
                        color: 'red',
                        backgroundColor: 'white',
                        onPress: () => setVisible(false),
                    }

                ]}
                showCancelButton={true}
                useNativeIOS
                useSafeArea
                visible={visible}
                onDismiss={() => setVisible(false)}
                optionsStyle={{ backgroundColor: 'white' }}
                destructiveButtonIndex={0}

            />
        </View>
    )
}

export default ActionSheetComponent

const styles = StyleSheet.create({})