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
}