export const RegExps = {
    numeric: /^(0\.[0-9]|[1-9]+(\.[0-9])?)[0-9]*$/,
    firstName: /^[a-zA-Z]{2,30}$/,
    lastName: /^[a-zA-Z]{2,30}$/,
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    digits: /^[0-9]+$/,
    digitsNotZero: /^[1-9][0-9]*$/,
    passwordLetters: /^[a-zA-Z]+$/,
    minLength6: /^.{6,}$/,
    mnemonic: /^([a-z]+ ){11}[a-z]+$/,
};
