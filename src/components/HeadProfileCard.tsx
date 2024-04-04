import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import UploadComponent from './UploadComponent';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';
import { DEFAULT_USER_PROFILE, MAIN_STORAGE } from '../screens/utils/constants/constants';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PROFILE_UPLOAD, } from '../screens/utils/constants/routes';
// import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from './ActivityIndicator';

const HeadProfileCard = () => {


    const { user, isLoggedIn, authToken } = useSelector((state: RootState) => state.user);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);


    const dispatch = useDispatch<AppDispatch>();




    const getImageUrl = (displayPicture: string | null) => {


        if (displayPicture) {
            return `${MAIN_STORAGE}/profile/${displayPicture}`
        } else {
            return DEFAULT_USER_PROFILE
        }

    }

    return (
        <View style={[generalStyles.flexStyles]}>
            <TouchableOpacity
                style={[{ marginHorizontal: 20, marginVertical: 10 }]}
                onPress={() => {
                    if (isLoggedIn) {
                        setShowModal(!showModal);
                    }
                }}
            >
                {imagePath ? (
                    <View>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                            source={{
                                uri: `${imagePath.imagePath}`,
                            }}
                        />
                        <View
                            style={[generalStyles.absoluteStyles, { bottom: -6, right: -15 }]}
                        >


                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primaryOrangeHex,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={()=>{}}>
                                <AntDesign
                                    name="upload"
                                    color={COLORS.primaryWhiteHex}
                                    size={25}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        source={{ uri: getImageUrl(user?.displayPicture) }}
                    />
                )}
            </TouchableOpacity>



            {/* progress bar */}

            {/* loader */}
            {loading && <ActivityIndicator />}
            {/* loader */}



            {/* modal section */}
            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}

            {/* modal section */}
        </View>
    );
};

export default HeadProfileCard;


