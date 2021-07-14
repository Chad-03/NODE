const controller = require("../controllers/goods.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/goods/getall", controller.getall);

    app.post("/api/goods/pay", controller.pay);

    app.post("/api/goods/getSelfGoods", controller.getSelfGoods)

    app.post("/api/goods/deleteSelfGoods", controller.deleteSelfGoods)

};