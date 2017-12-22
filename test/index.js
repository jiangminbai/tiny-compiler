const {tokenize} = require('../lib/tokenize');
const {parse} = require('../lib/parse');
const {transform} = require('../lib/transform');
const {generation} = require('../lib/generation');

const tokens = tokenize('(/ (- 72 10) (+ 4.5 2))');

console.log(tokens);

const ast = parse(tokens, null, 2);

console.log(JSON.stringify(ast, null, 2));

const newAst = transform(ast);

console.log(JSON.stringify(newAst, null, 2));

console.log(generation(newAst));
