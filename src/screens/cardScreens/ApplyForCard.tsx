import { StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { Wizard, WizardStepStates, } from 'react-native-ui-lib';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../theme/theme';
import CardInfo from './ApplyForCardScreens/CardInfo';
import Features from './ApplyForCardScreens/Features';
import ProductRestriction from './ApplyForCardScreens/ProductRestriction';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { APPLY_FOR_CARD, GET_ALL_REGIONS, GET_ALL_STATIONS } from '../utils/constants/routes';
import { showMessage } from 'react-native-flash-message';


interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}



const ApplyForCard = () => {



    const navigation = useNavigation<any>();
    const tabBarHeight = useBottomTabBarHeight();
    const { user, authToken } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false)

    const [errors, setErrors] = useState<any>({})


    const [cardApplication, setCardApplication] = useState<any>({
        cardType: '',
        cardHolderName: '',
        cardHolderEmail: '',
        cardHolderMobile: '',
        cardHolderDob: '',
        idType: "",
        idNumber: '',
        products: [],
        regions: [],
        usageDays: [],
        email: "",
        station_id: ""
    });

    useEffect(() => {
    }, [cardApplication])

    const [state, setState] = useState<State>({
        activeIndex: 0,
        completedStepIndex: undefined,
        allTypesIndex: 0,

    })


    const [idTypes, setIdTypes] = useState([
        {
            id: 1,
            name: 'National Identity Card',
        }, {
            id: 2,
            name: 'Passport'
        }, {
            id: 3,
            name: 'Driving License'
        }
    ])

    const [products, setProducts] = useState<any>(
        [

            {
                id: "Airtime", name: "Airtime"
            }, {
                id: "Cylinder", name: "Cylinder"
            }, {
                id: "Diesel", name: "Diesel"
            }, {
                id: "Services", name: "Services"
            }, {
                id: "Lubricants", name: "Lubricants"
            }, {
                id: "Pole", name: "Pole"
            },
            {
                id: "HousePipez", name: "HousePipe"
            }
        ]
    )

    const [weekDays, setWeekDays] = useState<any>([

        {
            id: "Monday",
            name: "Monday"
        },
        {
            id: "Tuesday",
            name: "Tuesday"
        },
        {
            id: "Wednesday",
            name: "Wednesday"
        },
        {
            id: "Thursday",
            name: "Thursday"
        },
        {
            id: "Friday",
            name: "Friday"
        },
        {
            id: "Saturday",
            name: "Saturday"
        },
        {
            id: "Sunday",
            name: "Sunday"
        },

    ])

    const [stations, setStations] = useState<any>([]);
    const [regions, setRegions] = useState<any>([]);

    // const [regions , setRegions] = 

    useEffect(() => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

        fetch(GET_ALL_STATIONS, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            setStations(data?.data)
        })

        fetch(GET_ALL_REGIONS, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            setRegions(data?.data)
        }).catch((err) => {

        })
        setLoading(false);
    }, [])


    const onApplyForCard = () => {


        try {
            //if any fields are empty show message indicating all fields required
            if (
                cardApplication.cardHolderName == "" || cardApplication.cardHolderEmail == "" ||
                cardApplication.cardHolderMobile == "" || cardApplication.idType == "" || cardApplication.idNumber == "" ||
                cardApplication.products.length == 0 || cardApplication.regions.length == 0 || cardApplication.usageDays.length == 0 ||
                cardApplication.stationId == ""
            ) {
                return showMessage({
                    message: "All fields required",
                    description: "Please fill in all fields",
                    type: "info",
                    icon: "info",
                    duration: 4000,
                    autoHide: false
                })
            }
            else {

                setLoading(true);

                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Authorization', `Bearer ${authToken}`);

                const formData = new FormData();
                formData.append("card_holder_name", cardApplication.cardHolderName);
                formData.append("mobile_number", cardApplication.cardHolderMobile)
                formData.append("id_type", cardApplication.idType);
                formData.append("id_number", cardApplication.idNumber)
                formData.append("station_id", cardApplication.station_id)
                formData.append("email", cardApplication.cardHolderEmail)
                formData.append("phone_number", cardApplication.cardHolderMobile)
                formData.append("station_id", cardApplication.station_id)
                formData.append("terms_and_conditions", 1)

                //send the products as an array
                //amenities loop through and also append them as an array
                cardApplication?.products?.
                    forEach((product: any) => {
                        formData.append("products[]", product)
                    })

                //send regions
                cardApplication.regions.forEach((region: any) => {
                    formData.append("regions[]", region)
                })

                //days
                cardApplication.usageDays.forEach((day: any) => {
                    formData.append("usage_days[]", day)
                })


                fetch(`${APPLY_FOR_CARD}`, {
                    headers,
                    method: 'POST',
                    body: formData
                })
                    .then(a => a.json())
                    .then(res => {
                        if (res.response == "success") {
                            setLoading(false)
                            showMessage({
                                message: "Card Application Succeed",
                                description: "Please check your email and phone number",
                                type: "success",
                                icon: "success",
                                autoHide: true,
                                duration: 5000
                            });
                            return navigation.goBack();

                        }
                        else {
                            setLoading(false)
                            return showMessage({
                                message: "Card Application  Failed",
                                description: "Please contact support or try again later",
                                type: "info",
                                icon: "info",
                                autoHide: true,
                                duration: 5000
                            });

                        }
                    }).catch(err => {
                        setLoading(false);
                        return showMessage({
                            message: "Card Application",
                            description: "Failed to apply for a card",
                            type: "info",
                            icon: "info"
                        })
                    })
            }

        } catch (error) {
            setLoading(false);
            return showMessage({
                message: "Card Application",
                description: "Failed to apply for a card",
                type: "info",
                icon: "info"
            })

        }

    }

    const onActiveIndexChanged = (activeIndex: number) => {
        // Update the activeIndex in the state
        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const goToNextStep = () => {
        const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
        const reset = prevActiveIndex === 2;

        if (reset) {
        } else {
            const activeIndex = prevActiveIndex + 1;
            let completedStepIndex: number | undefined = prevCompletedStepIndex;

            if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                completedStepIndex = prevActiveIndex;
            }

            // Check if the activeIndex or completedStepIndex needs updating
            if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                // Update the state to move to the next step
                setState((prevState: any) => ({
                    ...prevState,
                    activeIndex,
                    completedStepIndex,
                }));
            }
        }
    };


    const goBack = () => {
        const { activeIndex: prevActiveIndex } = state;
        const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

        setState((prevState: any) => ({
            ...prevState,
            activeIndex,
        }));
    };


    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <CardInfo
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    cardApplication={cardApplication}
                    setCardApplication={setCardApplication}
                    idTypes={idTypes}

                />
            case 1:
                return <Features
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    cardApplication={cardApplication}
                    setCardApplication={setCardApplication}
                    goBack={goBack}
                    products={products}
                    weekDays={weekDays}



                />
            case 2:
                return <ProductRestriction
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    cardApplication={cardApplication}
                    setCardApplication={setCardApplication}
                    goBack={goBack}
                    stations={stations}
                    regions={regions}
                    onApplyForCard={onApplyForCard}
                />



            default:
                return null;
        }
    };

    const getStepState = (index: number) => {
        const { activeIndex, completedStepIndex } = state;
        let stepState = Wizard.States.DISABLED;

        if (completedStepIndex && completedStepIndex > index - 1) {
            stepState = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            stepState = Wizard.States.ENABLED;
        }

        return stepState;
    };


    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%', }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: tabBarHeight, marginHorizontal: 5 }}
            >
                {/* Wizard for your main steps */}
                <Wizard testID={'uilib.wizard'}
                    activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                    containerStyle={{
                        marginHorizontal: 0,
                        marginVertical: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.primaryWhiteHex
                    }}
                    activeConfig={
                        {
                            color: COLORS.primaryWhiteHex,
                            state: WizardStepStates.ENABLED,
                            circleSize: 30,
                            circleBackgroundColor: COLORS.primaryBlackHex,
                            circleColor: COLORS.primaryBlackHex,


                        }

                    }

                >
                    <Wizard.Step
                        state={getStepState(0)}
                        label={'Card Info'}
                        enabled={true}

                    />
                    <Wizard.Step state={getStepState(1)} label={'Features'} />
                    <Wizard.Step state={getStepState(2)} label={'Stations'} />

                </Wizard>

                {/* Render the current step */}
                {renderCurrentStep()}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default ApplyForCard

