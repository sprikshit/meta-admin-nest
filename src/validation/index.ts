import ApiValidation from "./api.validation";
const apiValidation = new ApiValidation();

const registerSchema = apiValidation.registerSchema;

export {
    registerSchema
}