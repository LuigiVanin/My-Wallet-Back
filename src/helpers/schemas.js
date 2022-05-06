import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password2: Joi.string().equal(Joi.ref("password")).required(),
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const tokenSchema = Joi.object({
    token: Joi.string()
        .pattern(/^Bearer/)
        .required(),
});

const transferSchema = Joi.object({
    title: Joi.string().required(),
    value: Joi.number().required(),
    type: Joi.valid(-1, 1).required(),
});

export { signUpSchema, signInSchema, tokenSchema, transferSchema };
