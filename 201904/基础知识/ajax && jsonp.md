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
   - 源：协议、端口、域名
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

      

   2. ##### Window.name  + 跨域资源共享（CORS）iframe跨域

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



6. #### 浅谈session,cookie,sessionStorage,localStorage的区别及应用场景

   - 

