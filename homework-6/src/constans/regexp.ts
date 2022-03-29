export const regexp = {
    PHONE: /^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/,

    EMAIL: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,

    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

    ACTION: /[edklsiEDKLSI]/,
};
// Minimum eight characters, at least one letter and one number:
