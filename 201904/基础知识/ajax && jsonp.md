1. #### ajax

   - ajax是 通过 XMLHTTPRequest这个API 来使用 浏览器和服务器不刷新页面的情况下获取数据的技术

   - ##### ajax四部曲

     - 创建XMLHTTPRequest对象
     - 打开与服务器的连接
     - 发送请求
     -  在xmlHttp对象的一个事件上注册监听器：onreadystatechange

     ```js
     let xhr = new XMLHttpRequest();
     xhr.open('GET','/xxx');
     xhr.send('a=1&b=2');
     xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText) 
       }
     }
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