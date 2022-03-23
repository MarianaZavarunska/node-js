export const regexp = {
    PHONE: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/,
    EMAIL: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    ACTION: /[edklsiEDKLSI]/,
};
// Minimum eight characters, at least one letter and one number:
