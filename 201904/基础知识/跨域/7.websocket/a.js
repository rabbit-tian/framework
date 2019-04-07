let app = express();
let WebSocket = require('ws');
let wss = new WebSocket.Server({port:3000});
wss.on('connection',function (ws) {
  ws.on('message',function (data) {
    console.log(data)// 接收客服端传来的信息

    // 向客服端发送信息
    ws.send('no');
  })
})