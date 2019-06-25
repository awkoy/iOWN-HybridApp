import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import EditPasswordForm from "../../components/Forms/EditPassword";
import history from '../../history';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    getFormValues,
    isValid
} from 'redux-form';

import {editPassword, resetEdit} from "../../ducks/dashboard";

class EditPassword extends React.Component {

    constructor(props) {
        super(props);

        this.props.resetEdit();
    }

    submit = () => {
        const {oldPassword, password, confirm} = this.props.formValues;

        this.props.editPassword({oldPassword, password, confirm});
    };
    goBack = () => history.goBack();
    
    render() {
        //const { failed, error } = this.props.signin;
        const { formValid } = this.props;
        const {editPasswordLoaded, editPasswordError, editPasswordSuccess} = this.props.dashboard;

        return (
            <Container component="main" maxWidth="xs">

                <EditPasswordForm />

                {editPasswordError && <div className="register__error">
                    {`${editPasswordError}`}
                </div>}
                
                {editPasswordSuccess && <div className="register__success">
                    {`${editPasswordSuccess}`}
                </div>}
                
                <Button className="register__btn" fullWidth onClick={this.submit} variant="contained" disabled={!formValid} color="primary">
                    {!editPasswordLoaded ? 'Edit' : <CircularProgress size={22} />}
                </Button>

                <Box pt={2}>
                    <Button onClick={this.goBack} fullWidth variant="contained" color="primary">
                        Back
                    </Button>
                </Box>
            </Container>
        );
    }
};

const mapState2props = state => ({
    dashboard: state.dashboard,
    formValues: getFormValues('edit-password')(state),
    formValid: isValid('edit-password')(state)
});

const mapDispatch2props = {
    editPassword,
    resetEdit
};

export default connect(mapState2props, mapDispatch2props)(EditPassword);
