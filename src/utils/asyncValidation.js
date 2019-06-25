import { handleFetch } from "./fetch";
import transformError from "./transformServerErrors";

const composeAsyncValidators = (validatorFns) => {
    return async (values, dispatch, props, field) => {
      const validatorFn = validatorFns[field]
      await validatorFn(values, dispatch, props, field);
    };
}

const emailValidate = values => handleFetch("/validation/email", "POST", {
    email: values.email,
}).then(res => {if(!res.success) throw {email: transformError(res.payload)}});

const phoneValidate = values => handleFetch("/validation/phone", "POST", {
    phone: values.phone,
}).then(res => {if(!res.success) throw {phone: transformError(res.payload)}});

const asyncValidate = composeAsyncValidators({
    email: emailValidate,
    phone: phoneValidate
})

export default asyncValidate;