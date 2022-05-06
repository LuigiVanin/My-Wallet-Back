import {
    signInSchema,
    signUpSchema,
    transferSchema,
} from "../helpers/schemas.js";

const signUpValidation = (req, res, next) => {
    const validation = signUpSchema.validate({
        ...req.body,
    });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }
    next();
};

const signInValidation = (req, res, next) => {
    const validation = signInSchema.validate({
        ...req.body,
    });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }
    next();
};

const transferValidation = (req, res, next) => {
    const validation = transferSchema.validate({
        ...req.body,
    });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }
    next();
};

export { signUpValidation, signInValidation, transferValidation };
