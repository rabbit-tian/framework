1. #### 取数组的最大值

   ```js
   // es5的写法
   Math.max.apply(null,[23,2,4,2]); // 23
   
   // es6的写法
   Math.max(...[3,2,4,3,4]); // 4
   
   // reduce的方法
   let arr = [2,3,2,3,5,2,6];
   arr.reduce((prev,cur) => {
     if (prev > cur) {
         prev = prev;
     } else {
       prev = cur;
     }
     return prev;
   }) // 6
   ```

   

2. #### ES6的新特性有哪些

   1. 块级作用域：let    const

   2. 定义类的语法糖： class

   3. 新增了一种新的数据类型： Symbol

   4. 解构赋值

   5. 箭头函数

   6. 对象数组的扩展运算符

   7. 数组新增了API，isArray/from/of 方法；数组实例新增了 entries()，keys()，values()

   8. 模块化(import/export)

   9. Set和Map的数据结构

   10. 原生提供 Proxy 构造函数，用来生成 Proxy 实例

   11. ES6 新增了生成器(Generator)和遍历器(Iterator)

       

3. ####  ES6中的class和ES5的类有什么区别？

   1. ES6 class 内部所有定义的方法都是不可枚举的;
   2. ES6 class 必须使用 new 调用;
   3. ES6 class 不存在变量提升;
   4. ES6 class 默认即是严格模式;
   5. ES6 class 子类必须在父类的构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。

   

4. #### let、const 以及 var 的区别是什么？

   1. let ,const定义的变量不会出现变量提升，var定义的变量会提升；
   2. let,const定义的是块级作用域；
   3. let,const 不允许重复声明(会抛出错误)；
   4. Let,const 定义的变量在定义语句前，使用就会报错，var 不会
   5. const声明一个只读的变量，一但声明，常量的值就不会改变(如果声明的是一个对象，不能改变的是对象的引用地址)



5. #### 在JS中什么是变量提升？什么是暂时性死区？

   - 变量提升(var)：就是在变量声明前就可以使用，值是  undefined
   - 暂时性死区: 在代码块里，在let/const声明变量前使用，就会报错，叫做暂时性死区
     - 暂时性死区的本质：只要进入当前作用域，所要使用的变量都已经存在，但是不可以获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量







