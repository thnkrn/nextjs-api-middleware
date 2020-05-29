import initializeMiddleware from '../middleware/initializeMiddleware'
import validateMiddleware from '../middleware/validateMiddleware'
import { check, validationResult } from 'express-validator'

const validateBody = initializeMiddleware(
    validateMiddleware([
        check('first_name').isLength({min:1, max: 40}),
        check('last_name').isLength({min:1, max: 40}),
        check('customerID').isInt({ min: 1, max: 31}),
        check('gender').isIn(['male','female']),
        check('mobile_phone').isMobilePhone(['th-TH']),
    ], validationResult)
)

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await validateBody(req, res)

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      nextFunction(req, res)

      break;
    default:
      res.status(404).json({ message: "Request HTTP Method Failed." })
      break;
  }
}