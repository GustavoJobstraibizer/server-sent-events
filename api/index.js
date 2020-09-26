const express = require("express");
const parser = require("body-parser");
const app = express();
const EventEmitter = require("events");
const cors = require("cors");

const Stream = new EventEmitter();

app.use(cors("*"));
app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: true,
  })
);

app.get("/sse-resource", function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  Stream.on("push", function (event, data) {
    console.log("event " + event);
    console.log("data " + JSON.stringify(data));
    response.write(
      "event: " +
        String(event) +
        "\n" +
        "data: " +
        JSON.stringify(data) +
        "\n\n"
    );
  });
});

setInterval(function () {
  Stream.emit("push", "notification", {
    msg: "👋👋 You have new notifications 👋👋",
  });
  console.log("event emitting!!");
}, 3000);

app.listen(3000);
