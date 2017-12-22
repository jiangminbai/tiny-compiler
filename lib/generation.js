/**
 * @author Jan
 * @description 代码生成器
 */
function generation(node) {
  switch(node.type) {
    case 'program':
      return node.body.map(generation).join('\n');
    case 'arithExpression':
      return '(' + node.arguments.map(generation).join(` ${node.name} `) + ')';
    case 'number':
      return node.value;
    default:
      throw new Error('节点类型无法被识别');
  }
}

exports.generation = generation;