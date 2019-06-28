const Registration = require("../models/registrationModel");
var io = require('socket.io')(3000);
// const nsp = io.of('/chat-namespace');



io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('userDetails', (data) => {
     Registration.updateOne({ _id: data.userId },
      {
        $set:
        {
          socketId: socket.id
        }
      }).then((res) => {
        console.log(res,'res')
      })
  });

  socket.emit('test', {
    message: 'server to client'
  });

  socket.on('sentMessageDetails', (data) => {
    if (data.isAdmin) {
      var obj = {
        _id: data.receiverId
      }
    } else {
      var obj = {
        isAdmin: true
      }
    }
    Registration.find(obj).then((res) => {
      console.log(res, res.length,'res');
      var id = res[0].socketId;
      socket.broadcast.to(id).emit('ReceivedMessageDetails', {
        message: data.message,
        senderId: data.senderId,
        userName: data.userName,
        receiverId: res[0]._id
      })
    }).catch(err => {
      console.log(err,'err')
    })

  })




});



