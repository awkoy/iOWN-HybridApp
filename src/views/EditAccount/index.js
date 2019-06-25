import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import EditAccountForm from "../../components/Forms/EditAccount";
import history from '../../history';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    getFormValues,
    isValid,
    isDirty
} from 'redux-form';

import {editUserInfo, resetEdit} from "../../ducks/dashboard";

class EditAccount extends React.Component {

    constructor(props) {
        super(props);

        this.props.resetEdit();
    }

    submit = () => {
        const {fullName, phone} = this.props.formValues;

        this.props.editUserInfo({fullName, phone});
    };
    goBack = () => history.goBack();
    
    render() {
        //const { failed, error } = this.props.signin;
        const { formValid, formDirty } = this.props;
        const {userInfo: {
            phone, fullName
        }, userInfoLoaded, editUserInfoLoaded, editUserInfoError, editUserInfoSuccess} = this.props.dashboard;

        return (
            <Container component="main" maxWidth="xs">

                {userInfoLoaded ? <CircularProgress /> : <EditAccountForm initialValues={{fullName, phone}} />}

                {editUserInfoError && <div className="register__error">
                    {`${editUserInfoError}`}
                </div>}
                
                {editUserInfoSuccess && <div className="register__success">
                    {`${editUserInfoSuccess}`}
                </div>}
                
                <Button className="register__btn" fullWidth onClick={this.submit} variant="contained" disabled={!formValid || !formDirty} color="primary">
                    {!editUserInfoLoaded ? 'Edit' : <CircularProgress size={22} />}
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
    formValues: getFormValues('edit-account')(state),
    formValid: isValid('edit-account')(state),
    formDirty: isDirty('edit-account')(state)
});

const mapDispatch2props = {
    editUserInfo,
    resetEdit
};

export default connect(mapState2props, mapDispatch2props)(EditAccount);
