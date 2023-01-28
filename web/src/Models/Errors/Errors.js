class Error {
    constructor(message) {
        this.message = message;
    }
}

class FormInputError extends Error {
    constructor(message) {
        super(message);
    }
}

export default {
    FormInputError
};