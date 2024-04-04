
// export const BASE_URL = "https://development.stabexinternational.com/loyaltyapi";

export const BASE_URL = "https://checksum.co.ke/stabexmobileapi";




export const FETCH_COUNTRIES = `${BASE_URL}/api/Countries/CountriesList`
export const REGISTER_CUSTOMER = `${BASE_URL}/api/Account/Register`
export const REQUEST_SMS_OTP = `${BASE_URL}/api/Account/RequestSMSOTP`
export const REQUEST_EMAIL_OTP = `${BASE_URL}/api/Account/RequestEmailOTP`
export const VERIFY_EMAIL_OTP = `${BASE_URL}/api/Account/VerifyEmailOTP`
export const VERIFY_SMS_OTP = `${BASE_URL}/Account/VerifySMSOTP`
export const LOGIN_IN_USER = `${BASE_URL}/Token`;
export const VERIFY_LOGIN_OTP = `${BASE_URL}/api/Account/VerifyLoginSMSOTP`
export const LOGOUT_USER = `${BASE_URL}/api/Account/Logout`;
export const USER_FORGOT_PASSWORD = `${BASE_URL}/api/Account/ForgotPassword`
export const USER_SET_PASSWORD = `${BASE_URL}/api/Account/SetPassword`;
export const GET_STATIONS_LIST = `${BASE_URL}/api/Stations/StationsList`;
export const PRODUCT_LIST = `${BASE_URL}/api/Products/ProductsList`;
export const SUMBIT_DELIVERY_ADDRESS = `${BASE_URL}/api/Orders/SubmitDeliveryAddress`;
export const GET_CUSTOMER_ADDRESSES = `${BASE_URL}/api/Orders/MyDeliveryAddresses`









export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;
export const LOGOUT = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/auth/requestPasswordReset`;
export const RESET_PASSWORD = `${BASE_URL}/auth/resetPassword`;
export const RESEND_OTP = `${BASE_URL}/auth/resendOTP`
export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyEmail`
export const SAVE_DEVICE_INFO = `${BASE_URL}/auth/saveDeviceInfo`
export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/auth/setUpUserWalletAccount`;
export const UPDATEWALLETBALANCE = `${BASE_URL}/auth/updateShowWalletBalance`
export const UPDATEUSERAVATAR = `${BASE_URL}/auth/updateUserAvatarUrl`
export const UPDATE_USER_LOCATION = `${BASE_URL}/auth/updateUserLocation`;
export const UPDATE_PASSWORD_FIRST_USER = `${BASE_URL}/auth/resetPasswordFirstUser`;
export const PROFILE_UPLOAD = `${BASE_URL}/auth/profileUpload`



//payments
export const PROCESSORDER = `${BASE_URL}/processOrder`;
export const USERPAYMENTS = `${BASE_URL}/getUserPayments`;
export const USERPRODUCTS = `${BASE_URL}/getUserProducts`

//top up
export const TOPUP = `${BASE_URL}/processPayment`;



//cards
export const LINK_CARD = `${BASE_URL}/linkCard`;
export const UNLINK_CARD = `${BASE_URL}/unlinkCard`;
export const CUSTOMER_LINKED_CARDS = `${BASE_URL}/customerLinkedCards`;
export const APPLY_FOR_CARD = `${BASE_URL}/applyForCard`;
export const VERIFY_CARD_OTP = `${BASE_URL}/verifyCardOtp`;
export const RESEND_CARD_OTP = `${BASE_URL}/resendCardOtp`;


export const USERDELIVERIES = `${BASE_URL}/getUserDelivries`
export const USERNOTIFICATIONS = `${BASE_URL}/getUserNotifications`

//uploads
export const IMAGES_UPLOAD = `${BASE_URL}/uploadIdImages`


//products
export const GET_GAS_PRODUCTS = `${BASE_URL}/getGasProducts`;
//getProductCategories
export const GET_PRODUCT_CATEGORIES = `${BASE_URL}/getProductCategories`



//general
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllCategories`;
export const GET_ALL_SERVICES = `${BASE_URL}/getAllServices`;
export const GET_ALL_AMENTITIES = `${BASE_URL}/getAllAmenities`;
export const GET_ALL_PROPERTY_STATUSES = `${BASE_URL}/getAllPropertyStatuses`
export const GET_ALL_CURRENCIES = `${BASE_URL}/getAllCurrencies`
export const GET_ALL_PAYMENT_PERIODS = `${BASE_URL}/getAllPaymentPeriods`

//stations
export const GET_ALL_STATIONS = `${BASE_URL}/getAllStations`;
export const GET_ALL_REGIONS = `${BASE_URL}/getAllRegions`

//customer address
export const CREATE_CUSTOMER_ADDRESS = `${BASE_URL}/createCustomerAddress`;

//orders
export const GET_CUSTOMER_ORDERS = `${BASE_URL}/getCustomerOrders`;
export const CREATE_CUSTOMER_ORDER = `${BASE_URL}/createCustomerOrder`;
export const CREATE_MY_ORDER = `${BASE_URL}/orderProducts`;
export const CREATE_CUSTOMER_ORDER_WITH_PAYMENT = `${BASE_URL}/createCustomerOrderWithPayment`

//transaction statuses
export const GET_AIRTEL_TRANSACTION_STATUS = `${BASE_URL}/getAirtelTransactionStatus`
export const GET_MTN_TRANSACTION_STATUS = `${BASE_URL}/getMtnTransactionEquiry`



export const GET_SERVICE_BAYS = `${BASE_URL}/getServiceBays`;
export const GET_LUBRICANTS = `${BASE_URL}/getLubricants`;






