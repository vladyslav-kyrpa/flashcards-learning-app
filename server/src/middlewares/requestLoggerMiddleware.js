export default function requestLoggerMiddleware(req, res, next) {
    console.log(req.headers);
    next();
}