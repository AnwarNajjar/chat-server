import create_server from 'http';
const http_server = create_server.createServer().listen(3000, () => console.log(`server listening on port: 3000`))
//-------------------------------------------------
import { Server } from "socket.io";
const io = new Server(http_server)
 
//-------------------------------------------------
import logSymbols from 'log-symbols';
import chalk from 'chalk';
//-------------------------------------------------
io.on('connection', (socket) => {
  socket.on('user_socket_connect', (x) => {
    socket.join(x.room);
    io.to(x.room).emit('user_socket_connect', {"socket_info":x,"room_info":io.sockets.adapter.rooms.get(x.room).size})
    console.log(`${chalk.green(`user ${x.user}:`)}`, `${chalk.yellow(socket.id)}`, `${chalk.blueBright(`[room: ${x.room}]`)}`, `${chalk.greenBright('connection')}`, `${logSymbols.success}`, '\n');
    console.log("The Number of Users in This Room : ",`${chalk.yellow(`${io.sockets.adapter.rooms.get(x.room).size}`)}`)
  });
  socket.on('disconnect', () => {
 //   socket.emit('user_socket_disconnect', { "room_info": io.sockets.adapter.rooms.get(x.room).size })
    console.log(`${chalk.hex('#ff3245')('disconnect:')} ${chalk.yellow(socket.id)} ${logSymbols.error}`, '\n');
  })
  socket.on('message', (x) => {
    socket.in(x.room).emit('message', x)
  })
  socket.on('file_size', (x) => {
    socket.in(x.room).emit('file_size', x)
  })
  socket.on('buffer', (x) => {
    socket.in(x.room).emit('buffer', x)
  }) 
   socket.on('transfer_status', (x) => {
    socket.in(x.room).emit('transfer_status', x)
  })
})

