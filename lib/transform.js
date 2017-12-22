/**
 * @author Jan
 * @description 转换器
 */

// 访问者，包含处理对应ast节点类型的函数的对象
const visitor = {
  number(node, parent) {
    const childNode = {
      type: 'number',
      value: node.value
    }
    parent.push(childNode);
  },
  arithCall(node, parent) {
    const expression = {
      type: 'arithExpression',
      name: node.name,
      arguments: []
    }
    parent.push(expression);

    return expression.arguments;
  }
}

// 深度优先遍历ast，并构建newAst
function DFSwalk(ast, newAst, visitor) {

  function walkNodeArray(nodeArr, newNodeArr) {
    nodeArr.forEach(childNode => {
      walkNode(childNode, newNodeArr);
    });
  }

  function walkNode(node, newParentArr) {
    const type = node.type;

    if (visitor[type]) {
      newParentArr = visitor[type](node, newParentArr) || newParentArr;
    }

    switch(type) {
      case 'program':
      walkNodeArray(node.body, newParentArr);
        break;
      case 'number':
        break;
      case 'arithCall':
        walkNodeArray(node.params, newParentArr);
        break;
      default:
        throw new Error('不能被识别的类型');
    }
  }

  walkNode(ast, newAst.body);
}

// 转换器
function transform(ast) {
  const newAst = {
    type: 'program',
    body: []
  }

  DFSwalk(ast, newAst, visitor);

  return newAst;
}

exports.transform = transform;