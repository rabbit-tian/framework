1. #### 原始类型有哪几种？null是对象吗？原始数据类型和复杂数据类型存储有哪些区别？

   - number , boolean , string , null , undefined , symbol   六种

   - null不是对象，是基本数据类型，只是typeof null 返回值是 object

   - 原始数据类型 存储的是 值，复杂数据类型 存储的是 地址；当我们把对象赋值给另外一个变量时，复制的是地址，指向同一块内存空间，当其中一个对象改变时，另一个对象也会改变。

     

2. #### typeof 是否正确判断类型? instanceof呢？ instanceof 的实现原理是什么？

   - typeof 能正确判断 基本数据类型，除了null，typeof null 输出的是  object。

   - 对于复杂数据类型，只能判断函数，其他输出的都是  object，没法判断。

   - instanceof 能判断复杂数据类型，但是不能判断基本数据类型

   - instanceof是根据原型链判断的，A instanceof B ([`1,2,3] instanceof Object`)，在 A的原型链中层层查找，是否有原型等于 B.prototype，如果找到A的原型链的顶端(null，Object.protptype.__proto__),仍然不等于 B.prototype，那么返回false，否则返回true

     

3. #### for of , for in 和 forEach,map 的区别

   1. for  of：可以遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等，对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用，可以中断循环。

   2. for  in：遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值。可以中断循环。

   3. forEach：只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)。

      - forEach 是否会改变改变数组？

      ```js
      	/*
            forEach:
            1. 三个参数：子项，索引，循环的对象
            2. 没有返回值 ，只有forEach() 后边不支持链式操作
            3. 当数组中的元素是  值 类型，直接操作原数组可以改变，操作子项，不能改变; 
                              引用类型，可以改变;
            4. 不改变原数组
          */
      
      let arr = [10,2,3,4,5,6,7,8];
      let objArr = [
        {age:10,name: "tom"},
        {age:22,name: "jack"},
      ];
      
      arr.forEach(function (item,index,arr) {
        item = item *2;  // 操作子项，不可以改变原数组
      })
      console.log(arr); // [10,2,3,4,5,6,7,8]
      
      arr.forEach(function (item,index,arr) {
       	arr[1] = 10; // 直接操作数组，可以改变原数组
      })
      console.log(arr); // [10,10,3,4,5,6,7,8]
      
      
       
      objArr.forEach(function (item, index, arr) {
        item.age = item.age * 2;
        item.name = item.name + 2;
      })
      console.log(objArr);  // [{ age: 20, name: "tom2" }, { age: 44, name: "jack2" }]
      ```

      

   4. map: 只能遍历数组，不能中断，返回值是修改后的数组。

   5. Object.keys: 然后返回一个由属性名组成的数组

      ```js
      // 数组
      var arr = ['a', 'b', 'c'];
      console.log(Object.keys(arr)); // console: ['0', '1', '2']
      
      // 类数组对象
      var obj = { 0: 'a', 1: 'b', 2: 'c' };
      console.log(Object.keys(obj)); // console: ['0', '1', '2']
      
      // 类数组对象-随机下标
      var anObj = { 100: 'a', 2: 'b', 7: 'c' };
      console.log(Object.keys(anObj)); // console: ['2', '7', '100']
      
      // 不可枚举属性getFoo
      var myObj = Object.create({}, {
        getFoo: {
          value: function () { return this.foo; }
        } 
      });
      myObj.foo = 1;
      console.log(Object.keys(myObj)); // console: ['foo']
      ```

      

4. #### 如何判断一个变量是不是数组？

   ```js
   // 1. Array.isArray(arr)    true
   // 2. arr instanceof Array   true
   // 3. Object.prototype.toString.call(arr) === "[object Array]"  true
   // 4. arr.constructor === Array (不准确，可以通过 arr.constructor = Array 来指定相等)  true
   
   
   {a:1} instanceof Object  // 报错
   [1,2,3] instanceof Object  // true
   ```

   

5. #### 类数组和数组的区别是什么

   - 类数组
     1. 有length属性
     2. 不具有数组所具有的方法
     3. 类数组是一个普通对象，数组是Array类型
     4. 常见的类数组：函数的参数 arguments， DOM 对象列表(比如通过 document.querySelectorAll 得到的列表),  jQuery 对象 (比如 $("div")).

   - 类数组转化成数组

     ```js
     // 方法一
     Array.prototype.slice.call(arraylike);
     // 方法二
     [...arraylike]
     // 方法三
     Array.from(arraylike) // Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象。
     ```

     

6. #### == 和 === 有什么区别？

   1. === :  不需要类型转换，类型相同，值相等，才返回true

   2. == ：如果类型不同，先要进行类型转换
      1. 首先判断两者类型是否相同，如果相等，判断值是否相等.
      2. 如果类型不同，进行类型转换
      3. 判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
      4. 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
      5. 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
      6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

      ```js
      let person1 = {
          age: 25
      }
      let person2 = person1;
      person2.gae = 20;
      console.log(person1 === person2); //true,注意复杂数据类型，比较的是引用地址
      ```

      #### 思考: `[] == ![]`

      - 首先，我们需要知道 ! 优先级是高于 == (更多运算符优先级可查看: [运算符优先级](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FOperator_Precedence))

      - `![]` 引用类型转换成布尔值都是true,因此`![]`的是false

      - 根据上面的比较步骤中的第五条，其中一方是 boolean，将 boolean 转为 number 再进行判断，false转换成 number，对应的值是 0.

      - 根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number,空数组转换成数字，对应的值是0.(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)

      - 0 == 0; 为true

        

7. #### ES6中的class和ES5的类有什么区别？

   1. ES6 class 内部所有定义的方法都是不可枚举的;
   2. ES6 class 必须使用 new 调用;
   3. ES6 class 不存在变量提升;
   4. ES6 class 默认即是严格模式;
      ES6 class 子类必须在父类的构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。
   5. 举例：**ES6的继承拖拽**

   ```js
       class Drag {
           constructor(id) {
               this.box = document.getElementById(id);
               this.disX = 0;
               this.disY = 0;
           }
   
           init() {
               this.box.addEventListener('mousedown', (ev) => {
                   this.down(ev);
               })
           }
   
           down(ev) {
               this.disX = ev.clientX - this.box.offsetLeft;
               this.disY = ev.clientY - this.box.offsetTop;
   
               var move = (ev) => this.move(ev);
               var up = (ev) => this.up(ev, move, up);
   
               document.addEventListener('mousemove', move);
               document.addEventListener('mouseup', up);
           }
   
           move(ev) {
               this.box.style.left = ev.clientX - this.disX + 'px';
               this.box.style.top = ev.clientY - this.disY + 'px';
           }
   
           up(ev, move, up) {
               document.removeEventListener('mousemove', move);
               document.removeEventListener('mouseup', up);
           }
       }
   
       // Es6的继承
   
       class Drag2 extends Drag {
           constructor(id) {
               super(id);
           }
   
           move(ev) {
               var l = ev.clientX - this.disX;
               if (l < 50) {
                   l = 0;
               } else if (l > window.innerWidth - this.box.offsetWidth - 50) {
                   l = window.innerWidth - this.box.offsetWidth;
               }
               this.box.style.left = l + 'px';
               this.box.style.top = ev.clientY - this.disY + 'px';
           }
   
       }
   
       var d = new Drag('box');
       d.init();
   
       var d2 = new Drag2('box2');
       d2.init();
   
   ```

   

8. #### 数组的哪些API会改变原数组？

   - 改变原数组的方法:  pop/shift/unshift/push/splice/sort/reverse/fill/copyWithin

     ```js
     // fill 方法   使用固定值填充数组的每一项
     let arr = [1,2,3,4];
     arr.fill(10); // [10,10,10,10]
     
     /*	
     	arr.copyWithin(target,start,end) 方法  选择元素复制到指定位置
     	参数：
     			target：必需。复制到指定目标索引位置。
     			start: 可选。元素复制的起始位置。
     			end: 可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
     */
     
     let arr2 = [1,2,3,4,5,6];
     arr2.copyWithin(0,5); // [6,2,3,4,5,6]  选择索引为5的元素 复制到 索引为0的元素位置
     ```

     

   - 不改变的原数组的方法：

     - slice/concat/join/indexOf/lastIndexOf/toString/map/forEach/every/filter/reduce/entries/find
     - 注：数组的每一项是简单数据类型，且未直接操作数组的情况下



9. ####  let、const 以及 var 的区别是什么？

   - let 和 const 定义的变量不会出现变量提升，而 var 定义的变量会提升。

   - let 和 const 是JS中的块级作用域

   - let 和 const 不允许重复声明(会抛出错误)

   - let 和 const 定义的变量在定义语句之前，如果使用会抛出错误(形成了暂时性死区)，而 var 不会。

   - const 声明一个只读的常量。一旦声明，常量的值就不能改变(如果声明是一个对象，那么不能改变的是对象的引用地址)

   

10. #### 在JS中什么是变量提升？什么是暂时性死区？

    - 变量提升就是变量在声明之前就可以使用，值为undefined。

    - 在代码块内，使用 let/const 命令声明变量之前，该变量都是不可用的(会抛出错误)。这在语法上，称为“暂时性死区”。暂时性死区也意味着 typeof 不再是一个百分百安全的操作。

      ```js
      typeof x; // ReferenceError(暂时性死区，抛错)
      let x;
      typeof y; // 值是undefined,不会报错
      ```

    - 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

11. #### 如何正确的判断this? 箭头函数的this是什么？

    - 参考：<https://github.com/YvetteLau/Blog/issues/6>

    - 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
    - 函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
    - 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
    - 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
    - 如果把Null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
    - 如果是箭头函数，箭头函数的this继承的是外层代码块的this。

12. 





