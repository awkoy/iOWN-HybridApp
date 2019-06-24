import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, passwordConfirm, password} from "../../../utils/validation";

const SignUpEndForm = props => {
  const { handleSubmit, currentPassword } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="password"
            component={CustomInput}
            type="password"
            validate={[required,password]}
            label="Password"
            required
        />
        <Field
            name="confirmpass"
            component={CustomInput}
            type="password"
            validate={[required, passwordConfirm]}
            label="Confirm Password"
            required
        />
    </form>
  )
}

export default reduxForm({
  form: 'signup-end',
  destroyOnUnmount: false
})(SignUpEndForm)