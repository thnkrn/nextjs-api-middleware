export default function validateMiddleware(validation, validationRes) {
  return async (req, res, next) => {
    await Promise.all(validation.map((validate) => validate.run(req)))

    const error = validationRes(req)
    if (error.isEmpty()) {
      return next()
    }

    res.status(422).json({ error: error.array() })
  }
}