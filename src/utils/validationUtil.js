import {RegExps} from "../constants/regExps";

export class ValidationUtil {
    static isValid = (field, regExp = null, func = null) => {
        if (!field) return false;
        if (regExp && !regExp.test(field)) return false;
        if (func && !func(field)) return false;
        return true;
    };

    static isWeakPassword = password => {
        return !!(RegExps.passwordLetters.test(password) ||
            RegExps.digits.test(password) ||
            !RegExps.minLength8.test(password) ||
            (password.toUpperCase() === password) ||
            (password.toLowerCase() === password));
    };

    static isReadyToSubmit = (state, options) => {
        const {notEmpty, isValid} = options;

        if (notEmpty && notEmpty.some(i => {
          if (!state[i]) return true;
          if (typeof state[i] === "object" && state[i].value === "") return true;
          if (typeof state[i] === "string" && state[i] === "") return true;
          return false;
        })) return false;

        if (isValid && isValid.some(i => (typeof state[i] === "object" ? state[i].error : false))) return false;

        return true;
    }

    static validate = values => {

        let errors = {};

        if (!values.fullName) {
            errors.fullName = ""
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
    
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 7) {
            errors.password = 'Must be 6 characters or more';
        } else if (values.password.length > 16) {
            errors.password = 'Must be 15 characters or less';
        }
    
        if (!values.repassword) {
            errors.repassword = 'Required';
        } else if (!(values.repassword === values.password)) {
            errors.repassword = 'Must be identify with password';
        }

        return errors;
    }
}