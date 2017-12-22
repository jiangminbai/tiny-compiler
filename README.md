# tiny-compiler (一个简单的编译器)

## 前言

数值求值的栗子：
```
        LISP                 Javascript

      (+ 3 2)                 (3 + 2)
      (- 7 1)                 (7 - 1)
 (/ (- 72 10) (+ 4.5 2))     ((72 - 10) / ( 4.5 + 2))
```

如果某一天我们脑洞大开，想使用LISP的语法形式去编写Javascript，或许我们会使用到编译原理，将LISP语法形式的代码编译成Javascript。就像我们编写ES6标准的代码，通过Babel编译成浏览器都支持的ES5标准一样，这非常有趣。那么编译原理对于Javascript开发者有用吗？其实编译原理在很多开源项目上都进行了使用，比如Bebel、TypeScript、CoffeScript、Flow等等，可见掌握一些编译原理对于理解它们是很有用的一件事情。如上是一个数值求值的例子，接下来将演示将如上LISP语法编译为Javascript语法的整个编译过程。源码见[https://github.com/jan-wong/tiny-compiler](https://github.com/jan-wong/tiny-compiler)

## 整体实现

一般而言，编译原理会被划分为三个阶段：解析(解析又分为词法分析(tokenize)、语法分析(parse))、转换(transform)、代码生成(code generation)

### 词法分析器(tokenizer)

词法分析器的作用是将输入(input)的字符串序列划分成一个个标记对象(token)组成的数组，以便进行语法分析，标记对象包含标记类型和标记的字面值。标记是什么？标记是源代码的最小单位，一般用空格分开。编程语言的标记种类是有限的，比如有数据类型(字符串、数值、数组等)、操作符(算数操作符、比较操作符、逻辑操作符等)、分隔符(逗号、分号、括号等)、保留字、标识符等等。对'(/ (- 72 10) (+ 4.5 2))'进行词法分析可以得到如下, 源码见tokenize.js：

```javascript
                                                    [ { type: 'parren', value: '(' },
                                                      { type: 'arith', value: '/' },
                                                      { type: 'parren', value: '(' },
                                                      { type: 'arith', value: '-' },
                                                      { type: 'number', value: '72' },
                             词法分析(tokenize)        { type: 'number', value: '10' },
'(/ (- 72 10) (+ 4.5 2))'   =================>>>      { type: 'parren', value: ')' },
                                                      { type: 'parren', value: '(' },
                                                      { type: 'arith', value: '+' },
                                                      { type: 'number', value: '4.5' },
                                                      { type: 'number', value: '2' },
                                                      { type: 'parren', value: ')' },
                                                      { type: 'parren', value: ')' } ]
```

### 语法分析器(parser)

语法分析器的作用是将输入标记数组(tokens)重新格式化，让标记与标记之间形成关联，最后形成程序、语句或者表达式。我们会用一棵树来描述这种形成相互关系的程序，这棵树唤做抽象语法树(AST)。继续进行语法分析，过程如下，源码在parse.js：

```javascript
                                                                  {"type": "program",
                                                                  "body": [
                                                                    {
                                                                      "type": "arithCall",
                                                                      "name": "/",
[ { type: 'parren', value: '(' },                                     "params": [
{ type: 'arith', value: '/' },                                          {
{ type: 'parren', value: '(' },                                           "type": "arithCall",
{ type: 'arith', value: '-' },                                            "name": "-",
{ type: 'number', value: '72' },                                          "params": [
{ type: 'number', value: '10' },        语法分析(parse)                      { "type": "number", "value": "72" },
{ type: 'parren', value: ')' },      ==================>>>                  { "type": "number", "value": "10" }
{ type: 'parren', value: '(' },                                           ]
{ type: 'arith', value: '+' },                                          },
{ type: 'number', value: '4.5' },                                       {
{ type: 'number', value: '2' },                                           "type": "arithCall",
{ type: 'parren', value: ')' },                                           "name": "+",
{ type: 'parren', value: ')' } ]                                          "params": [
                                                                            { "type": "number", "value": "4.5" },
                                                                            { "type": "number", "value": "2" }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]}
```

### 转换器(transform)
转换器的作用是将符合LISP语法的语法树(AST)转换为符合Javascript语法的语法树。转换后如下：

```javascript
{
  "type": "program",
  "body": [
    {
      "type": "arithExpression",
      "name": "/",
      "arguments": [
        {
          "type": "arithExpression",
          "name": "-",
          "arguments": [ 
            { "type": "number", "value": "72" },
            { "type": "number", "value": "10" }
          ]
        },
        {
          "type": "arithExpression",
          "name": "+",
          "arguments": [
            { "type": "number", "value": "4.5" },
            { "type": "number", "value": "2" }
          ]
        }
      ]
    }
  ]
}
```
### 代码生成器(generator)

代码生成器的作用是将newAst生成javascript语法形式的代码。具体实现参考generation.js，结果如下：

```javscript
((72 - 10) / (4.5 + 2))
```

### 参考

[https://github.com/thejameskyle/the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)






