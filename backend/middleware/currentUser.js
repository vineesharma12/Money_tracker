export function currentUser(req, _res, next) {
  const header = req.header("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = req.verifyAuthToken?.(token);
  if (!payload?.userId) {
    return next({ status: 401, message: "Please login to continue" });
  }
  req.userId = payload.userId;
  next();
}
