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

   1. 

