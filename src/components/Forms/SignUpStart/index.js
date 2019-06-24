import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, email, phone} from "../../../utils/validation";
import asyncValidate from '../../../utils//asyncValidation';

const SignUpStartForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="fullName"
            component={CustomInput}
            type="text"
            validate={[required]}
            label="Full Name"
            required
        />
        <Field
            name="email"
            component={CustomInput}
            type="email"
            validate={[required, email]}
            label="Email Address"
            required
        />
        <Field
            name="phone"
            component={CustomInput}
            type="tel"
            validate={[required, phone]}
            label="Phone Number"
            required
        />
    </form>
  )
}

export default reduxForm({
  form: 'signup-start',
  destroyOnUnmount: false,
  asyncValidate,
  asyncBlurFields: ['email', 'phone']
})(SignUpStartForm)