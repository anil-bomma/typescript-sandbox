import multiply, { multiplyByTwo as mBy2, HelloWorld } from './multiply';
//import * as multiplyModule from './multiply';

const a = 5;
const b = 2;

console.log(`${a} * ${b} = ${multiply(a, b)}`);
mBy2(2);
