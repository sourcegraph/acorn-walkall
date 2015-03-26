var walkall = require('./walkall');
var acorn = require('acorn'), should = require('should'), walk = require('acorn/dist/walk');
var fs = require('fs');

describe('walkall', function() {
  var code = 'import a from "b";var foo = function(a) {}, bar = {d: 7}; let {d} = bar; export function foo() {} [1,2].map(x => x)';

  it('walks all AST nodes', function() {
    var ast = acorn.parse(code, {
      ecmaVersion: 6,
      sourceType: 'module'
    });
    var nodeTypes = [];
    walk.simple(ast, walkall.makeVisitors(function(node) {
      nodeTypes.push(node.type);
    }), walkall.traversers);
    nodeTypes.should.eql( [
      'Literal',
      'Identifier',
      'ImportDefaultSpecifier',
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
      'ExportNamedDeclaration',
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
  });

  it('Support entirity ES2015 module grammar', function() {
    var code = fs.readFileSync('./node_modules/everything.js/es2015-module.js');
    var ast = acorn.parse(code, {
      ecmaVersion: 6,
      sourceType: 'module'
    });
  });

  // Enable when acorn supports it :p
  // it('Support entirity ES2015 script grammar', function() {
  //   var code = fs.readFileSync('./node_modules/everything.js/es2015-script.js');
  //   var ast = acorn.parse(code, {
  //     ecmaVersion: 6,
  //     sourceType: 'script'
  //   });
  // });
});
