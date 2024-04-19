import { View, } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import Maps from '../../components/Maps';
import MapHeader from '../../components/MapHeader';
import StationsLIst from '../../components/StationsLIst';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { usePostQuery } from '../../hooks/usePostQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';


const StationFinder: React.FC<any> = () => {

    const { position } = useGetUserLocation()
    const {   station } = useSelector((state: RootState) => state.user);

    


    return (
        <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
            <View>
                <MapHeader 
                                   stations={station}
                                   position={position}
                />
            </View>

              <Maps
                stations={station}
                position={position}
            />  
            <StationsLIst
                stations={station}
                position={position}
            />

        </View>
    )
}

export default StationFinder

