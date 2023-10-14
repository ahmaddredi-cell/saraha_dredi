export const asynHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      //return res.status(500).json({ message: "catch error", error: error.stack });
      return next(new Error("Catch Error"));
    });
  };
};
export const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.json({ message: err.message });
  }
};
