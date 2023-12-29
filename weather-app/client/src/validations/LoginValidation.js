import joi from 'joi';

const loginValidation = ({ email,password }) =>
{
    const schema = joi.object({
        email: joi.string().email(
            { tlds: { allow: false } }
        ).required()
            .messages({
                'string.email': 'Email must be a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
            }),
        password: joi.string().min(6).max(20).required()
            .messages({
                'string.min': 'Password must be at least 6 characters long',
                'string.max': 'Password must be at most 20 characters long',
                'string.empty': 'Password is required',
                'any.required': 'Password is required',
            }),
    });

    return schema.validate({ email,password })
}

export default loginValidation;