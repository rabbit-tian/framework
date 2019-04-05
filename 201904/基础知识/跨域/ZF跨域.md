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

      

   2. Cors：纯后端提供(前后端)

   3. postMessage: 两个页面的通信

   4. document.main: 子域名和父域

   5. window.name

   6. location.hash

   7. http-proxy

   8. nginx

   9. websocket