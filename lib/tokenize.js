/**
 * @author Jan
 * @description 词法分析器
 * @param {String} input 
 */
function tokenize(input) {
  const tokens = [];  //包含tokens的数组
  let i = 0;  //input字符串序列的下标

  while(i < input.length) {
    let char = input[i];

    // 处理空白符
    const whiteReg = /\s/;
    if (whiteReg.test(char)) {
      i++;
      continue;
    }

    // 处理小括号
    if (char === '(' || char === ')') {
      tokens.push({type: 'parren', value: input[i]});
      i++;
      continue;
    }

    // 处理算数运算符
    const arithReg = /[\+\-\*\/%]/;
    if (arithReg.test(char)) {
      tokens.push({type: 'arith', value: char});
      i++;
      continue;
    }

    // 处理number
    const numberReg = /[0-9\.]/;
    if (numberReg.test(char)) {
      let numberical = '';

      while(numberReg.test(char)) {
        numberical += char;
        i++;
        char = input[i];
      }

      tokens.push({type: 'number', value: numberical});
      continue;
    }

    throw new Error('不能被识别的token类型');
  }

  return tokens;
}

exports.tokenize = tokenize;