import React from "react";
import TextField from '@material-ui/core/TextField';

export default ({ input, label, required, type, meta: { touched, error, warning } }) => (
    <TextField
        fullWidth
        label={label}
        type={type}
        error={touched && !!error}
        helperText={touched && error}
        required={required}
        {...input}
        margin="normal"
    />
);