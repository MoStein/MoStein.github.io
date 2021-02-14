"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silvester = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var silvester;
(function (silvester) {
    let bombs;
    let port = process.env.PORT;
    if (port == undefined) {
        port = 5002;
    }
    let databaseUrl = "mongodb+srv://MoStein:N3w-Media@cluster0.j3hzj.mongodb.net/DatenBankEIA2?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        bombs = mongoClient.db("Silvester").collection("Fireworks");
    }
    async function handleRequest(_request, _response) {
        console.log("Server here, what's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.query["command"] == "retrieve") {
                let coursor = bombs.find({});
                _response.write(coursor);
            }
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            _response.write("hallo");
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            // let storing: Bomb = JSON.parse('{"' + decodeURI(jsonString).replace(/"/g,'\\"').replace(/&/g, '","').replace(/=/g, '":"')+ '"}');
            // _response.write(storing);
            storeFireworks(url.query);
        }
        _response.end();
    }
    async function storeFireworks(_bomb) {
        // console.log("storing now");
        await bombs.insertOne(_bomb);
    }
})(silvester = exports.silvester || (exports.silvester = {}));
//# sourceMappingURL=server.js.map