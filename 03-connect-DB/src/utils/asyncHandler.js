// const asyncHandler = () => {};

import { request } from "express";

// export { asyncHandler };

const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      succes: false,
      message: error.message,
    });
  }
};

// const asyncHandler2 = (requestHandler) => {
//   (req, res, next) => {
//     Promise.resolve(requestHandler)(req, res, next).catch((error) =>
//       next(error)
//     );
//   };
// };
