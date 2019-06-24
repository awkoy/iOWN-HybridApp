//validation rules
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';
import {RegExps} from "../constants/regExps";

const isWeakPassword = password => {
    return !!(RegExps.passwordLetters.test(password) ||
        RegExps.digits.test(password) ||
        !RegExps.minLength8.test(password) ||
        (password.toUpperCase() === password) ||
        (password.toLowerCase() === password));
};

export const required = value => (value ? undefined : 'Required');

// export const password = value => 

export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength8 = minLength(8);
export const maxLength16 = maxLength(16);

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const email = value => value && !isEmail(value) ? 'Invalid email address' : undefined;
export const alpha = value => value && !isAlpha(value) ? 'Only alpha characters' : undefined;
export const phone = value => value && !isMobilePhone(value) ? 'Invalid phone number' : undefined;

export const password = value => value && isWeakPassword(value) ? 'Password must contain min 8 characters: only latin Capital Letters, Lower-Case Letters and Numbers' : undefined;

export const passwordConfirm = (value, allValues) => value && allValues.password !== value ? 'This field must match with your password field' : undefined;
export const loginPasswordConfirm = (value) => {
    const currentPassword = localStorage.getItem("wallet-password");
    return (value || currentPassword) && currentPassword !== value ? 'This field must match with your password' : undefined
}

