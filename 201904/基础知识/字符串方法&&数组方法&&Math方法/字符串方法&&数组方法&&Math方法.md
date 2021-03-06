1. #### 字符串的一些方法

   - ##### *字符串的方法，原字符串都不会改变*

   ```js
   
       let tian = "iamsuperman1206";
   
       // 1.找字符串中具体的值   str.charAt(index)
       console.log(tian.charAt(0));; //  i
   
       // 2.找字符ASCII码  str.charCodeAt(index)
       console.log(tian.charCodeAt(1)); // 97
   
       /*
         3.字符串截取  str.substr(n,m)
           a. 从索引n 截取 m 个元素
           b. 支持负数
       */ 
       console.log(tian.substr(0,2)); // im
       console.log(tian.substr(-4)); // 1206
   
   
       /*
         4.字符串截取  str.substring(n,m)
           a. 从 索引n 截取到 索引 m，不包括m
           b. 不支持负数
       */
       console.log(tian.substring(0,3)); // iam
   
   
       /*
         5.字符串截取  str.slice(n,m)
           a. 从 索引n 截取到 索引 m，不包括m
           b. 支持负数
       */
       console.log(tian.slice(0, 3)); // iam
       console.log(tian.slice(0, -3)); // iamsuperman1
   
       
       // 6.字符串第一次出现的位置    返回值：索引
       console.log(tian.indexOf('a')); // 1
   
       // 7.字符串最后一次出现的位置    返回值：索引
       console.log(tian.lastIndexOf('a')); // 9
   
       // 8.字符串转大写
       console.log(tian.toUpperCase()); // IAMSUPERMAN1206
       console.log(tian); 
   
       // 9. 字符串转小写
       console.log('TIAN'.toLowerCase()); // tian
   
     
   
   chaAt() chaCodeAt substr(n,m)  substring(n,m)  slice(n,m) indexOf lastIndexOf  toLowerCase toUpperCase
   ```

   

2. 数组的一些方法

   - 改变原数组的：push,pop,unshift,shift,reverse,sort,splice
   - 不改变原数组的：slice,join,indexOf,lastIndexOf,toString,

   ```js
       
   /*
         1. arr.push():  末尾添加
             (1). 返回值： 新数组长度
             (2). 原数组： 改变
       */ 
       let arr1 = [4, 5, 6, 7];
       console.log(arr1.push(8)); // 5
       console.log(arr1); // [4, 5, 6, 7, 8];
       
   
       /*
         2. arr.unshift():  头部添加
             (1). 返回值： 新数组长度
             (2). 原数组： 改变
       */ 
       let arr2 = [4, 5, 6, 7];
       console.log(arr2.unshift(3)); // 5
       console.log(arr2); // [3, 4, 5, 6, 7]; 
       
       /*
         3. arr.pop(): 末尾删除
             (1). 返回值：删除项
             (2). 原数组：改变
       */
       let arr3 = [2,4,5,6,7];
       console.log(arr3.pop()); // 7
       console.log(arr3); // [2, 4, 5, 6]
   
       /*
         4. arr.shift(): 头部删除
             (1). 返回值：删除项
             (2). 原数组：改变
       */
       let arr4 = [2, 4, 5, 6, 7];
       console.log(arr4.shift()); // 7
       console.log(arr4); // [4, 5, 6, 7]
   
       /*
         5. arr.splice()： 万能方法
             (1). 删除，清空数组，替换，插入
             (2). 原数组改变
       */
       let arr5 = [2,3,4,5,6,7];
       console.log(arr5.splice(0, 2));; // 从索引0开始 删除2个元素  返回值：[2,3]
       console.log(arr5); // 改变后的原数组 [4,5,6,7]
   
       let arr6 = [1,2,3,4,6];
       console.log(arr6.splice(2)); // 从索引2开始删除到末尾 返回值：[3,4,6]
       console.log(arr6); // [1,2]
   
       let arr7 = [5,4,3,2];
       console.log(arr7.splice(0)); // 清空数组 返回值：全新的数组 [5,4,3,2]
       console.log(arr7); // []
   
       let arr8 = [2,4,6,8];
       console.log(arr8.splice(0,2,'x')); // 从索引0开始删除2个元素，然后用 ‘x’ 代替  返回值 [2,4]
       console.log(arr8); // ['x',6,8]
   
       let arr9 = [3,4,5,6];
       console.log(arr9.splice(3,0,'y')); // 插入功能：在索引3的前面 插入 ‘y’  返回值：[]
       console.log(arr9); // [3,4,5,'y',6]
   
       /*
         6. arr.reverse(): 倒着排序
           (1). 返回值：排好后的新数组
           (2). 原数组：改变
       
       */
       let arr10 = [2,3,4,5,6,7];
       console.log(arr10.reverse()); // [7,6,5,4,3,2]
       console.log(arr10); // [7,6,5,4,3,2]
   
   
       /*
           7. arr.sort(): 排序， 升序和降序
             (1). 返回值： 新数组
             (2). 原数组：改变
         */
         let arr12 = [2, 6, 9, 5, 6];
         // console.log(arr12.sort());;// [2, 5, 6, 6, 9]  默认 升序排列
         // console.log(arr12); // [2, 5, 6, 6, 9]
   
         console.log(arr12.sort((a,b) => a - b)); // [2, 5, 6, 6, 9] 升序
         console.log(arr12.sort((a,b) => b - a)); // [9, 6, 6, 5, 2] 降序
         console.log(arr12); // [9, 6, 6, 5, 2]
   
   
       /*
         8. arr.slice(n,m): 截取，从索引n 开始截取到 索引 m, 不包括m
             (1). 返回值：返回截取到的数组
             (2). 原数组：不变
       */
       let arr11 = [4,5,3,4,5,6];
       console.log(arr11.slice(2,4)); // [3,4]
       console.log(arr11); // [4, 5, 3, 4, 5, 6]
   
   
       /*
         9. arr.concat(arr1,arr2,...)：数组拼接
           (1). 返回值：拼接好新数组
           (2). 原数组：不变
       
       */
       let arr13 = [1,3,4,2];
       let arr14 = [0,2,5,1];
       console.log(arr13.concat(arr14, arr14,3)); // [1, 3, 4, 2, 0, 2, 5, 1]
       console.log(arr13,arr14); // [1, 3, 4, 2]   [0, 2, 5, 1]
   
       /*
         10. arr.toString(): 数组转字符串，单纯转字符串,不能加‘-’这种分隔符
             (1). 返回值： 转化后的字符串
             (2). 原数组：不变
       */
       let arr15 = [2,4,3,5,2];
       console.log(arr15.toString()); // "2,4,3,5,2"
       console.log(arr15); // [2, 4, 3, 5, 2]
   
       
        /*
          11. arr.join(): 数组转字符串，单纯转字符串,不能加‘-’这种分隔符
              (1). 返回值： 转化后的字符串
              (2). 原数组：不变
        */
         let arr16 = [2, 4, 3, 5, 2];
         console.log(arr16.join('-')); // "2-4-3-5-2"
         console.log(arr16); // [2, 4, 3, 5, 2]
   
   
       /*
         12. arr.indexOf(): 当前项第一次出现的位置
           (1). 返回值：索引值
           (2). 原数组： 不变
       */
       let arr17 = [3,4,2,1,4];
       console.log(arr17.indexOf(4)); //  1
       console.log(arr17); // [3, 4, 2, 1, 4]
   
   
       /*
         13. arr.indexOf(): 当前项第一次出现的位置
           (1). 返回值：索引值
           (2). 原数组： 不变
       */
       let arr18 = [3,4,2,1,4];
       console.log(arr18.lastIndexOf(4)); //  4
       console.log(arr18); // [3, 4, 2, 1, 4]
   
     
   ```

   

3. #### Math方法

   ```js
       // 1. Math.ceil(num): 向上取整
       console.log(Math.ceil(3.4)); // 4
     
       // 2. Math.floor(num): 向下取整
       console.log(Math.floor(3.6)); // 4
   
       // 3. Math.round(num): 四舍五入
       console.log(Math.round(3.6)); // 4
       console.log(Math.round(3.2)); // 3
   
       // 4. Math.abs(num): 取绝对值
       console.log(Math.abs(-6)); // 6
   
       // 5. Math.sqrt(num): 取平方根
       console.log(Math.sqrt(64)); // 8
   
       // 6. Math.pow(num): 次幂，平方
       console.log(Math.pow(2,4)); // 计算 2的 4次幂  16
   
       // 7. Math.PI(): π
       console.log(Math.PI); // 3.141592653589793
   
       // 8. Math.random(): 随机数   默认 取 0-1 之间的小数
   
       parseInt(Math.random()*10); // 0-9任意值 包括0和9
       Math.round(Math.random()*10); // 0-10任意值  包括 0和10
       Math.round(Math.random() * (15-5) + 5); // 5-15 任意值 包括5和15
       Math.ceil(Math.random()*8); // 1-8任意值 包括 1和8
   
   ```

   