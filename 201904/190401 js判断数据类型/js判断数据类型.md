#### JS六大数据类型数据类型

- 基本类型：Number，String，Boolean，Undefined，Null    
- 引用类型：Object

#### 如何判断数据类型

1. 基本类型检测：typeof 方法 

2. typeof null => object => null  被当做一个空对象引用

3. Array.isArray([1,2,3]) ,判断数组 

4. instanceof：判断一个变量是否是某个对象的实例   

    **缺点：无法对基础类型进行判断，一般在typeof判断object时 再使用instanceof**

   ```js
   1. {} instanceof Object    => true
   2. [1,2,3,4] instanceof Array   => true
   3. var fn = function () {}   
   	 fn instanceof Function => true
   ```

5. constructor: 返回对象相对应的构造函数

   1. 从定义上来说跟instanceof不太一致，但效果都是一样的

      ```js
      a instanceof Array      (a是否是Array的实例) 
      a.constructor == Array  (a实例的构造函数是否是 Array)
      
      // 例子
      function App(name){
        this.name = name;
      }
      var app = new App('tian');
      console.log(app.constructor); // 函数  function App (name) {this.name = name}
      
      // 判断各种数据类型
      [].constructor == Array;
      {}.constructor == Object;
      "string".constructor == String;
      123.constructor == Number;
      true.constructor == Boolean;
      ```

      

6. Object.prototype.toString.all()

   ```js
   var num1 = 1;
   var num2 = new Number(1);
   Object.prototype.toString.call(num1) == "[object Number]"; // true
   Object.prototype.toString.call(num2) == "[object Number]"; // true
   
   var arr = [];
   Object.prototype.toString.call(arr) == "[object Array]"; // true
   
   var func = function () {};
   Object.prototype.toString.call(func) == "[object Function]"; // true
   
   function A () {};
   var a = new A();
   Object.prototype.toString.call(a) == "[object Object]"; // true
   ```

   