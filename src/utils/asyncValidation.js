import { handleFetch } from "./fetch";

const composeAsyncValidators = (validatorFns) => {
    return async (values, dispatch, props, field) => {
      const validatorFn = validatorFns[field]
      await validatorFn(values, dispatch, props, field);
    };
}

const emailValidate = values => handleFetch("/validation/email", "POST", {
    email: values.email,
}).then(res => {if(!res.success) throw {email: "That email already is taken"}});

const phoneValidate = values => handleFetch("/validation/phone", "POST", {
    phone: values.phone,
}).then(res => {if(!res.success) throw {phone: "That phone already is taken"}});

const asyncValidate = composeAsyncValidators({
    email: emailValidate,
    phone: phoneValidate
})

export default asyncValidate;