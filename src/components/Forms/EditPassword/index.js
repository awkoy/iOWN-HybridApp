import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, password, passwordConfirm} from "../../../utils/validation";

const EditPasswordForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="oldPassword"
            component={CustomInput}
            type="password"
            validate={[required, password]}
            label="Old Password"
        />
        <Field
            name="password"
            component={CustomInput}
            type="password"
            validate={[required, password]}
            label="New Password"
        />
        <Field
            name="confirm"
            component={CustomInput}
            type="password"
            validate={[required, passwordConfirm]}
            label="Confirm Password"
        />
    </form>
  )
}

export default reduxForm({
  form: 'edit-password'
})(EditPasswordForm)