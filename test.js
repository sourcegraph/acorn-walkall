var walkall = require('./walkall');
var acorn = require('acorn'), should = require('should'), walk = require('acorn/util/walk');

describe('walkall', function() {
  var code = 'import a from "b";var foo = function(a) {}, bar = {d: 7}; let {d} = bar; export function foo() {} [1,2].map(x => x)';
  it('walks all AST nodes', function(done) {
    var ast = acorn.parse(code, {
      ecmaVersion: 6
    });
    var nodeTypes = [];
    walk.simple(ast, walkall.makeVisitors(function(node) {
      nodeTypes.push(node.type);
    }), walkall.traversers);
    nodeTypes.should.eql( [
      'Literal',
      'Identifier',
      'ImportSpecifier',
      'ImportDeclaration',
      'Identifier',
      'BlockStatement',
      'Identifier',
      'FunctionExpression',
      'VariableDeclarator',
      'Identifier',
      'Identifier',
      'Literal',
      'Property',
      'ObjectExpression',
      'VariableDeclarator',
      'VariableDeclaration',
      'Identifier',
      'Identifier',
      'Property',
      'ObjectPattern',
      'Identifier',
      'VariableDeclarator',
      'VariableDeclaration',
      'BlockStatement',
      'Identifier',
      'FunctionDeclaration',
      'ExportDeclaration',
      'Identifier',
      'Identifier',
      'ArrowFunctionExpression',
      'Literal',
      'Literal',
      'ArrayExpression',
      'Identifier',
      'MemberExpression',
      'CallExpression',
      'ExpressionStatement',
      'Program'
    ]);
    done();
  });
});
