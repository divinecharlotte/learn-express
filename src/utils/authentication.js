import isAuthenticated from "passport"

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(406).json({
        code: 406,
        message: "Log In First",
    })
}
export default isLoggedIn