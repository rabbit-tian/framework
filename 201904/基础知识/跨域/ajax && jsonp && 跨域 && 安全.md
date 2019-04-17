1. #### ajax

   - ajax是 通过 XMLHTTPRequest这个API 来使用 浏览器和服务器不刷新页面的情况下获取数据的技术

   - ##### ajax四部曲

     - 创建XMLHTTPRequest对象
     - 打开与服务器的连接
     -  在xmlHttp对象的一个事件上注册监听器：onreadystatechange
     - 发送请求

     ```js
     let xhr = new XMLHttpRequest();
     xhr.open('GET','/xxx');
     xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText) 
       }
     }
     xhr.send('a=1&b=2');
     ```

     

2. #### jsonp

   - 浏览器受同源策略的限制，不能拿到外域的数据，但是有 src的标签可以拿到，而script标签比较特殊，它拿到代码之后可以执行。此时我们需要和后端商量好一个参数，在我们调取接口的时候，把这个参数传给后端，后端通过get方式拿到这个参数，再把对应的数据放在这个参数里面传递过来，前端这边约定好一个同名函数，后端返回的数据就相当于执行了这个函数，里面的参数就相当于参数传递，这样就拿到了数据。

3. #### 图例

   ![ajax和jsonp](/Users/tiantian/Desktop/framework/201904/基础知识/images/ajax和jsonp.jpeg)



4. #### 同源策略

   - 定义：一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现
   - 同源：协议、域名、端口；   只要有一个不同，就是跨域
   - 好处：安全

5. #### 解决跨域

   1. ##### jsonp

      - 通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的
      - 缺点：只能使用get请求，jsonp是从其他域加载代码执行，容易受到攻击

      ```js
      // 比如 a.html 页面。需要利用 ajax 获取 一个不同域上的json数据，json数据地址：http://example.com/data.php，
      
      // http://example.com/data.php返回的必须是一个能执行的js文件
      
      // 定义的dosomething函数, 并且它的参数就是我们需要的json数据
      
      
      // a.html页面代码
      function dosomething(jsondata) {
        // 处理获得的json数据
      }
      dosomething(['a','b','c']); // 页面的输出结果
      <script src="http://example.com/data.php?callback=dosomething"></script>
      
      // JQuery 版本的  写法
      // jquery会自动生成一个全局函数来替换callback=?中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用
      $.getJSON('http://example.com/data.php?callback=?',function (jsondata) {
        // 处理获得的json数据
      })
      
      ```

      

   2. ##### Window.name  + 跨域资源共享   iframe跨域

      - window对象有个name属性，该属性特征：在一个窗口的生命周期内，窗口载入的所有页面共享一个window.name，每个页面都有对 window.name 的读写权限
      - 举例

      ```js
      // a.html 页面  想要获取  页面www.cnblogs.com/data.html里的数据。
      // 原理：1. data.html页面： 给当前的window.name设置一个a.html页面想要得到的数据值
      //       2. 在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取data.html							的数据，然后a.html再去得到iframe获取到的数据。
      //       3. 把这个iframe的src设为www.cnblogs.com/data.html,获取到data.html的通过window.name设置的数据
      
      // data.html 页面代码
      <script>
        window.name = "我就是 a.html 页面想要的数据，可以传递一个json数据";
      </script>	
      
      // a.html 页面的代码
      <head>
        <script>
          function getData() {
      			var iframe = document.getElementById('proxy');
            iframe.onload = function () {
              var data = iframe.contentWindow.name; // 获取iframe里的window.name ,也就是																										data.html 页面里设置的数据
              console.log(data); // 获取的数据
            }
        		iframe.src="b.html"; // b.html 随意的页面,只要和a.html 同源就行了，目的是让 a.html 能														访问到 iframe里面的东西
          }
      	</script>
      </head>
      <body>
      	<iframe id="proxy" src="http://www.cnblogs.com/data.html" style="display: none; onload="getData()"></iframe>
      </body>
      ```

   3. ##### H5的方法  window.postMessage(message,targetOrigin)    缺点： IE6，7不支持

      - 该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 *  
      - 可以用来向其他所有的 window 对象发送消息

      ```js
      // 发送数据的页面   http://test.com/a.html
      <script>
       function onLoad () {
        var iframe = document.getElementById('iframe');
        var win = iframe.contentWindow; // 获取window对象
        win.postMessage('哈哈，我是a页面传过来的数据','*'); // 向不同域的 http://test.com/b.html 																										页面发送消息
       }
      </script>
      <iframe id="iframe" src="http://test.com/b.html" onload="onLoad()"></iframe>
      
      
      // 接收数据的 页面  http://test.com/b.html
      <script>
      window.onmessage = function (e) { // 注册 message 事件来接收消息
        e = e || event; // 获取事件对象
        console.log(e.data); // 通过data属性得到传达的 消息
      }
      </script>
      ```

   4. #####  跨域资源共享（CORS）

      - 服务端设置 请求头  Access-Control-Allow-Origin 
      - 纯后端的解决方式,每次请求都会有一个origin信息被后端捕捉，后端可以通过设置对这个origin的域允许访问来解决跨域问题

   5. ##### WebSocket协议跨域

      - 是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯

   6. ##### 服务端代理proxy

      - 同源策略是针对浏览器端进行的限制，可以通过服务器端来解决该问题

      - 因为服务器间的数据交互没有跨域限制，所以我们可以通过一个中间代理服务器来请求目标服务器的数据，也就是开发服务器发送请求到代理服务器，代理服务器再请求目标服务器，将数据返回给开发服务器

   参考：<https://www.cnblogs.com/2050/p/3191744.html>,<https://blog.csdn.net/ligang2585116/article/details/73072868>

   视频：<http://www.html5train.com/kecheng/detail_1557742>



6. #### 浅谈session,cookie,sessionStorage,localStorage的区别及应用场景

   - 参考：<https://www.cnblogs.com/cencenyue/p/7604651.html>

   - cookie和session

     - 相同点：cookie和session都是用来跟踪浏览器用户身份的会话方式。

     - 不同点分析

       1. **保持状态**：cookie保存在浏览器端，session保存在服务器端

       2. **cookie机制**：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，简称：会话cookie；如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据依然存在，直到过期时间结束才消失。cookie是服务器发给客户端的特殊信息，以文本的方式保存在客户端，每次请求都会带上它

          **session机制**：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否会包含sessionId。如果有sessionId，服务器会根据这个id返回对应的session对象，如果没有客户端请求中没有sessionId，服务器会创建新的session对象，并把sessionId在本次的响应中返回给客户端。通常使用cookie的方式存储sessionId到客户端，在交互中浏览器按照规则将sessionId发送给服务器，如果用户禁用cookie，则要使用URl重写，可以通过response。encodeURL(url)进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。

       3. **存储内容**：cookie只能保存字符串类型，以文本的形式，session支持任何类型的对象

       4. **存储大小**：单个cookie保存数据不能超过 4KB，session没有限制

       5. **安全性**：cookie欺骗，cookie截取，session的安全性大于cookie

          - sessionId存在cookie中，先得攻破cookie，才能攻破session
          - sessionId需要有人登录
          - sessionId是加密的

       6. **应用场景**：

          - cookie: 
            - 判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码)
            - 保存上次登录的时间等信息。
            - 保存上次看的页面
            - 浏览计数
          - session
            - session用于保存每个用户的专用信息，变量的值保存在服务器端，通过sessionId来区分不同的客户
            - 网站商城中的购物车
            - 保存用户的登录信息
            - 将某些数据放入session中，供同一用户不同页面的使用
            - 防止用户非法登录

       7. 缺点：

          - cookie
            - 大小限制
            - 安全性低
            - 每次访问都要传送cookie
          - session
            - 服务器内存压力大
            - 依赖于cookie(sessionId保存在cookie)，如果禁用cookie，则要使用URL重写，不安全
            - 创建session白能量有很大的随意性，过度的使用session变量将会导致代码不可读二期不好维护

   - ##### WebStorage

     - 提供两种 API：localStorage(本地存储)  和 sessionStorage(会话存储)
     - localStorage(本地存储)  和 sessionStorage(会话存储)的比较
       1. localStorage 生命周期是永久的，除非主动删除数据；sessionStorage的生命周期，在关闭浏览器窗口后就会被销毁
       2. 存储大小一般 5MB
       3. 都存储在客户端，不和服务器进行通信
       4. 都只能存储字符串类型，复杂的对象可以用JSON对象的stringify和parse来处理
       5. 获取方式  window.localStorage(sessionStorage)

     - WebStorage的优点:
       1. 存储空间大
       2. 节省网络流量：不需要传到服务器，存储在本地的数据可以直接获取，减少了客服端和服务端的交互
       3. 快速显示：从本地获取比到服务器端获取快的多
       4. 安全性：webStorage不会随着HTTP header发送到服务器端，安全性相对于cookie高一点，不会担心截取，但存在伪造问题
       5. webStorage提供的方法，操作方便
          - setItem(key,value) — 保存数据
          - getItem(key) — 获取数据
          - removeItem(key) — 删除单个数据
          - clear() — 清空所有数据
          - key(index) — 获取某个索引的key 

     

     

7. ### 安全类

   #### CSRF

   1. 基本概念和缩写
      - 概念：跨站请求伪造
      - 全写：Cross-site Request Forgery
      - CSRF攻击就是 **攻击者利用受害者的身份，以受害者的名义发送恶意请求**
      - 与XSS（Cross-site scripting，跨站脚本攻击）不同的是，XSS的目的是获取用户的身份信息，攻击者窃取到的是用户的身份（session/cookie），而CSRF则是利用用户当前的身份去做一些未经过授权的操作。
      - 参考：<https://juejin.im/entry/58b7baf78d6d81006527e130>
   2. 攻击原理
      - 用户在注册网站A登陆过，网站A给用户下发cookie
      - 该用户又访问了网站B，网站B有诱导链接，用户点击后，访问到了网站A，浏览器自动上传cookie，网站A对身份验证后发现是正确的，然后允许登录，网站B对网站A进行攻击
      - 关键：用户在注册网站A登陆过
      - 网站中某个接口存在漏洞
   3. 防御措施
      - Token验证：登录时，向用户本地存放一个Token，用于下次登录的验证
      - Referer验证：页面来源
      - 隐藏令牌：类似于Token

   #### XSS

   1. 基本概念和缩写
      - 概念：跨域脚本攻击
      - 全写：cross-site scripting
      - 参考文档：<https://juejin.im/entry/5b4b56fd5188251b1a7b2ac1>
   2. 攻击原理
      - 学习视频：http://www.imooc.com/learn/812
      - 核心：向页面注入脚本(js)，
   3. 防御措施
      - 核心：让注入的脚本不能执行

   #### CSRF和XSS区别

   1. CSRF
      - 依赖于用户登录网站
      - 利用本身的漏洞，去帮你自动执行接口
   2. XSS
      - 向页面注入js，运行js，做一些事情