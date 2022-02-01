const controller = require("../controllers/message.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
app.post("/api/message/add", controller.addMessage);

app.get("/api/message/all", controller.allMessages);

}