const transformError = (error) => {
	switch (error[0]) {
		case 'USER_NOT_FOUND':
			return 'User not found. Please check your email or create new wallet';
			break;
		case 'EMAIL_ALREADY_EXIST':
			return 'User already exists in the database. Please login';
			break;
		case 'PHONE_NOT_VALID':
			return 'Phone number is not valid. Please enter a correct phone number';
			break;
		case 'PHONE_ALREADY_EXIST':
			return 'User with such phone number already exists in the database. Please login';
			break;
		case 'WALLET_ALREADY_EXIST':
			return 'Wallet already exists in the database. Please login';
			break;
		case 'AUTH_ERROR':
			return 'Email or Password was entered incorrectly';
			break;
		case 'USER_NOT_VERIFIED':
			return 'Please activate your account';
			break;
		case 'PASSWORDS_MISMATCH':
			return 'Password was entered incorrectly';
			break;
		default:
            return error;
			break;
	}
};

export default transformError;