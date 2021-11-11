exports.isAuthorized = (opts) => {

    const rootEmail = process.env.ROOTEMAIL;

    return function (req, res, next) {
        var _a = res.locals, role = _a.role, email = _a.email, uid = _a.uid;

        if(req.params.id) const id = req.params.id;

        if (email === rootEmail)
            return next();
        if (opts.allowSameUser && id && uid == id)
            return next();
        if (!role)
            return res.status(403).send({ message: "Unauthorized" });
        if (opts.hasRole.includes(role))
            return next();
        return res.status(403).send({ message: "Unauthorized" });
    };
}