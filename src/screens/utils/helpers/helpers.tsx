import moment from 'moment';
import { Vibration } from 'react-native';



export const limitDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    } else {
        return description;
    }
};





//helper types
export type _String = string;
export type _Mixed = string | null;
export type _Number = number;
export type _Boolean = boolean;
export type __Mixed = string | boolean;
export type _Any = any;

// export const delay = (ms: _Number): _Any => new Promise((res) => setTimeout(res, ms));

//check empty filds
export const EmptyError = (data: _String, name: _String): _Mixed => {
    if (data === '' || data === null) {
        return `${name} cannot be empty`;
    }
    return null;
};
//empty to disable buttons
export const EmptyFieldError = (field: _String): boolean =>
    field === '' || field === null ? true : false;
//empty to disable buttons

export const lengthError = (
    data: _String,
    desiredLength: _Number,
    field: _String,
): _Mixed => {
    if (data && data.length < desiredLength) {
        return `${field} must be ${desiredLength} characters and above`;
    }
    return null;
};

export const lengthChecker = (
    data: _String,
    desiredLength: _Number,
): boolean => {
    if (data && data.length < desiredLength) {
        return true;
    }
    return false;
};

//   /[^a-zA-Z]/.test(data) === true
export const passwordRegx: _Any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
export const passwordError = (data: _String): _Mixed => {
    if (data && data.length < 6) {
        return 'atleast 6 character needed';
    }

    return null;
};

export const passwordRegxChecker = (data: _String): _Mixed => {
    if (data && !passwordRegx.test(data)) {
        return 'password must be atleast 6 characters and contain atleast one number, one uppercase and one lowercase letter';
    }
    return null;
};

export const confirmPasswordError = (
    password: _String,
    confirmPassword: _String,
): boolean => {
    if (confirmPassword && confirmPassword !== password) {
        // return 'The passwords do not match';
        return true;
    } else {
        return false;
    }
};

export const numberError = (data: any): boolean => {
    if (data && /^[\s()+-]*([0-9][\s()+-]*){9,10}$/.test(data) !== true) {
        //return 'Please enter a valid phone number with 10 digits and please use only numbers';
        return true;
    } else {
        return false;
    }
};

export const emailRegex: _Any =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

export const emailChecker = (data: _String): boolean => {
    if (data && emailRegex.test(data) !== true) {
        return true;
    } else {
        return false;
    }
};

export const emailMessage = (data: _String): _Mixed => {
    if (data && emailRegex.test(data) !== true) {
        return 'Please enter valid email address.';
    }
    return null;
};

export const formatPhoneNumber = (number: any) => {
    let num = '+256';
    //remove a 0 from the beginning of the number and append a +256
    if (number.charAt(0) === '0') {
        num += number.substring(1);
    }
    return num;
};

export function formatTime(timeStr: string) {
    const timeObj = moment(`1970-01-01T${timeStr}Z`);
    const formattedTime = timeObj
        .format('hh:mm A')
        .replace(/^(\d{1}):/, '0$1:');
    return formattedTime;
}

// export function formatTime(timeStr: string) {
//     return moment(timeStr, 'HH:mm:ss').format('h A');
// }

export function getErrorMessage(errors: any, fieldName: string) {
    if (errors?.hasOwnProperty(fieldName)) {
        return errors[fieldName][0];
    } else {
        return '';
    }
}

export function causeVibration(duration?: number) {
    Vibration.vibrate(duration ?? 50);
}

export const trimText = (text: any, maxLength: number) => {
    if (text?.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength - 3) + '...';
    }
};

// a function that gets the current date
export const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
};

export function extractMonthAndYear(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return { year, month, day };
}


export const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'UGX',
    });
}

export const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

    // Round off to the nearest whole number
    return Math.round(distance);
};


export const changeNumberToMonth = (number: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[number - 1];
}

export const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^[0-9]{10}$/; // Regex to match exactly 10 digits
    return regex.test(phoneNumber);
};


export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return regex.test(email);
};

export const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%*!+/\-{}()~^]).{8,20}$/;
    return regex.test(password);
};

export const validateConfirmPassword = (confirmPassword: string, password: string) => {
    return confirmPassword === password; // Check if confirm password matches the original password
};


