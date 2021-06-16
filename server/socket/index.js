const jwt = require("jsonwebtoken");
const socket = require("socket.io");
const socketCookieParser = require("socket.io-cookie-parser");

const onlineUsers = require("../onlineUsers");

exports.appSocket = (server) => {
  const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
  });

  // use Cookie parser
  io.use(socketCookieParser());

  // user authentication
  io.use((socket, next) => {
    const token = socket.request.cookies['token'];
    if (token === null || !token) {
        console.log(`There is no access token Found! time =>${new Date().toLocaleString()}`);
        return next(new Error(`There is no token Found! time =>${new Date().toLocaleString()}`));
    } else {
        try {
            const accessToken = jwt.verify(token, process.env.JWT_SECRET);
            return next();
        } catch (error) {
            // tokens can be expired or invalid.
            if (error.name === "TokenExpiredError") {
                console.log(`AccessToken or CSRF Token is Expired! time =>${new Date().toLocaleString()}`)
                return next(new Error(`AccessToken is Expired! time =>${new Date().toLocaleString()}`));
            } else if (error.name === "JsonWebTokenError") {
                console.log(`Invalid Access Token or CSRF token! time =>${new Date().toLocaleString()}`)
                return next(new Error(`Invalid Access Token! time =>${new Date().toLocaleString()}`));
            } else {
              //catch other unprecedented errors
              console.log(`Unknown Error time =>${new Date().toLocaleString()}`, error)
              return next(new Error(`Unknown Error time =>${new Date().toLocaleString()}`));
            }
        }
    }
  });

  io.on("connection", socket => {
    console.log('Socket connected socketId=>', socket.id, 'time=>', new Date().toLocaleString());

    // when a user comes online
    socket.on("comes-online", id => {
      if (!onlineUsers.includes(id)) {
        onlineUsers.push(id);
      };
      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });

    // when a user goes logout or goes offline
    socket.on("logout", (id) => {
      if (onlineUsers.includes(id)) {
        userIndex = onlineUsers.indexOf(id);
        onlineUsers.splice(userIndex, 1);
        socket.broadcast.emit("remove-offline-user", id);
      }
    });
    
    // on disconnect
    socket.on("disconnect", () => {
      console.log(`Connection Disconnected !!! clientId => ${socket.id}`);
    });

  });
}