export const regexp = {
    PHONE: /^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/,
    EMAIL: /^.+@[^@]+\.[^@]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

// Minimum eight characters, at least one letter and one number:
// +380 (67)-995-33-65
