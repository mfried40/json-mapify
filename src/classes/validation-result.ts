import Joi from "joi";

class ValidationResult {
    constructor(valid: boolean = true, message?: string) {
        this.valid = valid;
        this.message = message;
    }
    valid: boolean;
    message?: string;
    get errorMessage(): string {
        return this.message || this.joiResult?.error?.message || "";
    }
    get isValid(): boolean {
        return (this.valid && !this.isJoiError) ? true : false;
    }
    get isJoiError(): boolean {
        return (this?.joiResult?.error) ? true : false;
    }
    joiResult?: Joi.ValidationResult;
    static fromJoiResult(joiResult: Joi.ValidationResult): ValidationResult {
        const result = new ValidationResult();
        result.joiResult = joiResult;
        return result;
    }
}

export default ValidationResult;