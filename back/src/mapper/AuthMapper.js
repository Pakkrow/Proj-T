// const ApiError = require("@exceptions/apiError");
// const Joi = require("joi");
// const { LoginRequestDto } = require("@dto/LoginRequestDto");
// const { RegisterRequestDto } = require("@dto/RegisterRequestDto");
// const { UserRole } = require("@model/user.model");

// class AuthMapper {
//     loginSchema = Joi.object({
//         username: Joi.string().required().messages({
//             "any.required": "Invalid username",
//         }),
//         password: Joi.string().required().messages({
//             "any.required": "Invalid password",
//         }),
//     });

//     registerSchema = Joi.object({
//         username: Joi.string().max(19).required().messages({
//             "any.required": "Invalid username",
//             "string.max": "Username is too long (max 19)",
//         }),
//         displayname: Joi.string().max(19).required().messages({
//             "any.required": "Invalid displayname",
//             "string.max": "Displayname is too long (max 19)",
//         }),
//         password: Joi.string()
//             .min(8) 
//             .max(191)
//             .required()
//             .pattern(/(?=.*[A-Z])/, 'uppercase')
//             .pattern(/(?=.*\d)/, 'digit')
//             .pattern(/(?=.*[@$!%*?&])/ , 'special')
//             .messages({
//                 "any.required": "Invalid password",
//                 "string.min": "Password should be at least 8 characters long",
//                 "string.max": "Password is too long (max 191)",
//                 "string.pattern.base": "Password must contain at least one uppercase letter, one digit, and one special character"
//             }),
//         email: Joi.string().email().max(191).allow('').messages({
//             "string.email": "Invalid email",
//             "string.max": "Email is too long (max 191)",
//         }),
//         role: Joi.string().valid(...Object.keys(UserRole)).uppercase().optional().messages({
//             "any.only": `User role is invalid. Should be one of: [${Object.keys(UserRole).join(", ")}]`,
//         }),
//         picture_url: Joi.string().allow(''),
//     });

//     toLoginRequestDto(credentials) {
//         const { error, value } = this.loginSchema.validate(credentials, { abortEarly: false });
        
//         if (error) {
//             throw ApiError.badRequest(error.details.map(e => e.message).join(", "));
//         }
//         return new LoginRequestDto(value.username, value.password);
//     }
//     toRegisterRequestDto(user) {
//         const { error, value } = this.registerSchema.validate(user, { abortEarly: false });

//         if (error) {
//             throw ApiError.badRequest(error.details.map(e => e.message).join(", "));
//         }
//         return new RegisterRequestDto(
//             value.username,
//             value.displayname,
//             value.password,
//             value.role?.toUpperCase() ?? undefined,
//             value.picture_url,
//             value.email
//         );
//     }
// }

// module.exports = AuthMapper;
