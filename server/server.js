const app = require("express")();

const server = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log("a user connected", socket);
  console.log("socket is active to connected");
  socket.on("chat", (payload) => {
    console.log("payload is", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
