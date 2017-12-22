/**
 * @author Jan
 * @description 语法分析器
 */
function parse(tokens) {
  let i = 0; // tokens的下标

  function walk() {
    let token = tokens[i];
    
    // 数值类型
    if (token.type === 'number') {
      return {
        type: 'number',
        value: token.value
      }
    }

    // 处理'('  入口
    if (token.type === 'parren' && token.value === '(') {
      token = tokens[++i];

      // 在LISP语言中 运算操作符实际上是一个函数，数值为其中的参数
      let node = {
        type: 'arithCall',
        name: token.value,
        params: []
      }

      token = tokens[++i];
      while(token && token.value !== ')') {
        node.params.push(walk());
        token = tokens[++i];
      }

      // 出口
      if (token.type === 'parren' && token.value === ')') return node;
    }
  }

  const ast = {
    type: 'program',
    body: []
  }

  ast.body.push(walk());

  return ast;
}

exports.parse = parse;