1. #### 同源策略(http://www.baidu.com:8080)

   - 协议(http:)、域名(www.baidu.com)、端口(8080)
   - 只要有一个不一样，就属于跨域

2. #### 为什么浏览器不支持跨域

   - cookie  localStorage 同域下的：防止跨域网站攻击，比如用户登录银行网站后，发一个sessionId，用户再登录一个用户网站，恶意网站拿着这个id登录银行网站，盗取资源
   - DOM元素的同源策略：保护当前网站信息的暴露
   - ajax不支持跨域：不能随意拿别人的链接

3. #### 为什么要实现跨域

   - 前后端通信
   - 两个页面需要通信

4. #### 跨域

   1. jsonp

      - link的href，img的src，script的src  不受同源策略的限制
      - 缺点：只能发get请求，不能发post，put
      - 不安全，xss攻击，脚本注入攻击

      ```js
      <script>
        // 百度输入关键字的 请求链接
        // https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-	8&json=1&prod=pc&from=wise_web&sugsid=1457,21078,20697,28775,28721,28557,28584,28519,28626,28606&wd=pig&req=2&bs=%E6%A8%B1&pbs=pi&csor=3&pwd=pi&cb=show
      
        // show是前后端商量好的参数，用来接收数据
        function show(data) {
          console.log(data);
        }
      </script>
      
      <!-- 精简后的链接 
        1、wd: 请求的关键词
        2、cb: 后端返回的 包着数据的函数
        -->
      <script src="https://www.baidu.com/sugrec?prod=pc&wd=pig&cb=show"></script>
      
      
      // 封装jsonp
      <script>
        function jsonp ({ url, params, cb}) {
        return new Promise((resolve,reject) => {
          let script = document.createElement('script');
          // 全局的函数cb,放在window里
          window[cb] = function (data) {
            resolve(data); // 成功函数
            document.body.removeChild(script); // 用完后移除script标签
          }
          params = {...params,cb}; // 将多个关键词和cb放在一起  wd=b&cb=show
          let arrs = [];
          for (var key in params) {
            arrs.push(`${key}=${params[key]}`);
          }
          script.src = `${url}&${arrs.join('&')}`; // 将url和参数放一起，放到src上
          document.body.appendChild(script); // 放到页面上
        })
      }
      
      jsonp({
        url: "https://www.baidu.com/sugrec?prod=pc",
        params: {wd: "pig"},
        cb: "show",
      }).then(function (data) {
        console.log(data);
      })
      
      </script>
      ```

      

   2. Cors：纯后端提供(前后端通信)

      - 服务端解决的方案，比较安全
      - res.setHeader('Access-Control-Allow-Origin',origin) : 允许哪个源访问我
        - res.setHeader('Access-Control-Allow-Origin',*)  不能和 使用cookie一起使用
      - res.setHeader('Access-Control-Allow-Header','name') : 允许携带哪个头访问我
      - res.setHeader('Access-Control-Allow-Methods','PUT') : 允许哪个方法访问我
      - res.setHeader('Access-Control-Allow-Credentials',true) : 允许cookie访问我
      - res.setHeader('Access-Control-Allow-Max-Age',6) : 预检的存活时间
      - res.setHeader('Access-Control-Expose-Headers','name') : 允许前端获取哪个头
      - 

   3. postMessage + iframe: 两个页面的通信 

      ```js
      // a页面
      <body>
        <iframe src="./2-b.postMessage.html" frameborder="0" id="iframe" onload=load()></iframe>
      
        <script>
          // a页面和 b 页面通信
          function load(){
            // 向 b 页面发送消息
            let frame = document.getElementById('iframe');
            iframe.contentWindow.postMessage('我来自a页面','*');
      
            // 接收b页面的信息
            window.onmessage = function (e) {
              console.log(e.data);
            }
          }
        </script>
      </body>
      
      
      // b页面
      <script>
          // 接收消息
          window.onmessage = function (e) {
          console.log(e.data);
          // 向a页面发送消息
          e.source.postMessage('我来自b页面',e.origin);
        }
      </script>
      ```

      

   4. window.name  + iframe :  两个页面通信，利用另一个空页面

      ```js
      // a页面
      <body>
        <!-- a 和 c页面的通信 -->
        <!-- 利用iframe 引入 c页面 -->
        <iframe src="./c.html" frameborder="0" id="iframe" onload=load()></iframe>
      
        <script>
          // a 和 b是同域的
          // c是独立域的
          // a引用c，c把值放在window.name上，把a的引用地址改到b
          let first = true; 
          function load() {
            let iframe = document.getElementById('iframe');
            if (first) {
              iframe.src="./b.html";
              first = false;
            } else {
              console.log(iframe.contentWindow.name);
            }
          }
        </script>
      </body>
      
      // c页面
      <body>
        <script>
          // 在 windoe.name 中存入数据
          window.name = "我是c页面的数据";
        </script>
      </body>
      ```

      

   5. location.hash

      ```js
      // a 页面
      <body>
        <!--  路径后边的hash值是可以用来通信的
          a 把 hash值传给 c
          c 把 hash值传给 b
          b将结果放到 a的hash值上
      
          ab同域  http://localhost:3000/a.html  http://localhost:3000/b.html
          c不同域 http://localhost:4000/c.html
         -->
      
        <iframe src="http://localhost:4s000/c.html#lamapig" id="iframe"></iframe>
        <script>
          // 拿到b传过来的hash值
          window.onhashchange = function () {
            console.log(location.hash);
          }
        </script>
      </body>
      
      // c页面
      <body>
        <script>
          console.log(location.hash);
          let iframe = document.createElement('iframe');
          iframe.src="http://localhost:3000/b.html#yes";
          document.body.appendChild(iframe);
        </script>
      </body>
      
      // b 页面
      <body>
        <script>
          // 让 a的hash值等于c传过来的hash值
          window.parent.parent.location.hash = location.hash;
        </script>
      </body>
      
      ```

   6. document.domain: 子域名和父域

      ```js
      // a页面获取b页面的数据
      
      // a 页面
      <body>
        <!-- 
          window.domain: 
            1. 使用对象：一级域名和二级域名之间的跨域
         -->
        <iframe src="http://b.tian.cn:3000/b.html" id="iframe" onload="load()"></iframe>
        <script>
          document.domain = 'tian.cn'; // 定义在此域名下可通信
          let iframe = document.getElementById('iframe');
          function load(){
            console.log(iframe.contentWindow.a);
          }
        </script>
      </body>
      
      
      // b页面
      <script>
        document.domain = 'tian.cn'; // 定义在此域名下可通信
      	let a = 100;
      </script>
      ```

   7. websocket

      - *websocket : 高级api 不兼容*  
      - *使用插件可实现兼容 socket.io*

      ```js
      // 客服端  a.html
      <body>
        <script>
          // websocket : 高级api 不兼容     使用插件可实现兼容 socket.io
          let socket = new WebSocket('ws://localhost:3000');
          socket.onopen = function () {
            // 向服务器发送信息
            socket.send('go away');
          };
      
          // 接收服务器发来的信息
          socket.onmessage = function (e) {
            console.log(e.data);
          }
        </script>
      </body>
      
      
      // 服务端  a.js
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
      ```

      

   8. http-proxy

      - 纯代理：利用服务器之间没有跨域限制

   9. nginx

      - 下载  nginx 包
      - 在nginx.conf文件里  配置  路径和 头部

      