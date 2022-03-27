class errorController {
    renderErrPage(req, res) {
        let err = decodeURIComponent(req.query.err);
        res.render("errPage", { err });
    }
}

module.exports = new errorController();