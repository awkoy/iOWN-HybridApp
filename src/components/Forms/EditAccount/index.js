import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../Field';
import {required, phone} from "../../../utils/validation";

const EditAccountForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
            name="fullName"
            component={CustomInput}
            type="text"
            validate={[required]}
            label="Full Name"
        />
        <Field
            name="phone"
            component={CustomInput}
            type="tel"
            validate={[required, phone]}
            label="Phone Number"
        />
    </form>
  )
}

export default reduxForm({
  form: 'edit-account'
})(EditAccountForm)