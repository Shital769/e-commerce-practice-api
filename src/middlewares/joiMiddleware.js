import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    console.log(req.body, "Joi");

    //conditions
    const schema = Joi.object({
      address: Joi.string().min(5).max(60).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().allow("", null),
    });

    //compare
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {}
};

//email verfication validation
export const emailVerificationValidation = (req, res, next) => {
  try {
    //conditions
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
      }),
      emailVerificationCode: Joi.string().required(),
    });

    //compare
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next(error);
  } catch (error) {
    next(error);
  }
};
