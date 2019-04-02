#### JS六大数据类型数据类型

- 基本类型：Number，String，Boolean，Undefined，Null ,  Symbol(独一无二的值，避免属性名冲突)
- 引用类型：Object

#### 如何判断数据类型

1. 基本类型检测：typeof 方法 

2. typeof null => object => null  被当做一个空对象引用

3. Array.isArray([1,2,3]) ,判断数组 

4. instanceof：判断一个变量是否是某个对象的实例   

   **特点：**

   - 无法对基础类型进行判断，一般在typeof判断object时 再使用instanceof
   - 只要当前类在当前的实例原型链上，都返回true，不能找到直接创建实例的构造函数

   ```js
   1. {} instanceof Object    => true
   2. [1,2,3,4] instanceof Array   => true
   3. var fn = function () {}   
   	 fn instanceof Function => true
   ```

5. constructor: 返回对象相对应的构造函数

   ##### 特点：

   - constructor属性只可以判断出是否是直接类的实例，所以用constructor找实例的构造函数更严谨。

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

   

6. Object.prototype.toString.call()

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

7. 判断数据类型函数封装

   ```js
   function judgeDataType (obj) {
     // 基本类型判断
     if (typeof obj == "number") {
         return "number";
     } else if (typeof obj == "string") {
         return "string";      
     } else if (typeof obj == "boolean") {
         return "boolean";
     } else if (typeof obj == "undefined") {
         return "undefined";      
     } else if (typeof obj == "object") {
        // 此时判断此为 引用类型，采用 instanceof 方法判断
       if (Array.isArray(obj)) {
           return "array"
       } else if (Object.prototype.toString.call(obj) == '[object Function]') {
           return "function";
       }	else if (obj instanceof RegExp) {
           return "regexp";     
       } else if (obj instanceof Date) {
           return "date";     
       } else {
         return "object";
       }
    	}
   }
   ```

   

8. Apply 和 call 的区别
   - 相同点：都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象”
   - 不同点：只是传入的参数列表形式不同
     - apply：最多只能有两个参数——新this对象和一个数组argArray。
     - call：它可以接受多个参数，第一个参数与apply一样，后面则是一串参数列表。