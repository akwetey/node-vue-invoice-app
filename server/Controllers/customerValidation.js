const { check, validationResult } = require("express-validator");
const validateCustomer = [
  check("full_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Full name is required")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("Full name must have more than two characters"),
  check("phone_number")
    .not()
    .isEmpty()
    .withMessage("Phone Nnumber is required"),
  check("email_id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter a correct email"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(422).json({ errors: errorMessages });
    }
    next();
  },
];

module.exports = validateCustomer;
