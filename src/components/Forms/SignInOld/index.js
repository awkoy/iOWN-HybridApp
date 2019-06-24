import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, loginPasswordConfirm} from "../../../utils/validation";

const SingInOldForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="password"
            component={CustomInput}
            type="password"
            validate={[required, loginPasswordConfirm]}
            label="Type your password"
            required
        />
    </form>
  )
}

export default reduxForm({
  form: 'signin-old'
})(SingInOldForm)