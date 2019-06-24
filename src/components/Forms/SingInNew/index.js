import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, email, password} from "../../../utils/validation";

const SingInNewForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="email"
            component={CustomInput}
            type="email"
            validate={[required, email]}
            label="Email"
            required
        />
        <Field
            name="password"
            component={CustomInput}
            type="password"
            validate={[required, password]}
            label="Type your password"
            required
        />
    </form>
  )
}

export default reduxForm({
  form: 'signin-new'
})(SingInNewForm)