import { body } from "express-validator";

export const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid Email"),
        body("name")
            .trim()
            .notEmpty().withMessage("Name is required"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("password length should be at least 6 chars")
            .isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 1,
            }).withMessage("please enter a strong password")
    ]
}


export const userLoginValidator = () => {
    return [
        body("email")
          .trim()
          .notEmpty().withMessage("Email is required")
          .isEmail().withMessage("Email is not valid"),
        body("password")
          .trim()
          .isEmpty().withMessage("Password is required"),
    ];
}