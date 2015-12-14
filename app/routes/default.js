

module.exports.defaultMessage = function (req, res, next) {
    console.log("Accessed 'default route'")
    res.json({ message: "This is the default route" });
}

module.exports.error404 = function  (req, res, next) {
    console.log("404 Error!");
    res.status(200);
    res.send(req.originalUrl +" - Does not exist!");
}
