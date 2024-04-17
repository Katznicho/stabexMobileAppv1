
// export const BASE_URL = "https://development.stabexinternational.com/loyaltyapi";

// export const BASE_URL = "https://checksum.co.ke/stabexmobileapi";

export const BASE_URL = "https://development.stabexinternational.com/loyaltyapi";


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
export const GET_CUSTOMER_ADDRESSES = `${BASE_URL}/api/Orders/MyDeliveryAddresses`;
export const SUBMIT_ORDER = `${BASE_URL}/api/Orders/SubmitOrder`;
//api/Orders/SubmitOrder

export const GET_WEEK_DAYS = `${BASE_URL}/api/Cards/WeekDays`;
export const GET_REGIONS = `${BASE_URL}//api/Cards/Regions`;
export const GET_STATION_BY_REGION = `${BASE_URL}/api/Cards/StationByRegion`;



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






export const GET_SERVICE_BAYS = `${BASE_URL}/getServiceBays`;
export const GET_LUBRICANTS = `${BASE_URL}/getLubricants`;






