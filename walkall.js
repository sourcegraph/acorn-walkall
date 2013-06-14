var acorn = require('acorn'), walk = require('acorn/util/walk');

// types is an array of all SpiderMonkey AST node types recognized by acorn.
var types = exports.types = [
  'ArrayExpression',
  'AssignmentExpression',
  'BinaryExpression',
  'BlockStatement',
  'BreakStatement',
  'CallExpression',
  'CatchClause',
  'ConditionalExpression',
  'ContinueStatement',
  'DebuggerStatement',
  'DoWhileStatement',
  'EmptyStatement',
  'Expression',
  'ExpressionStatement',
  'ForInStatement',
  'ForInit',
  'ForStatement',
  'Function',
  'FunctionDeclaration',
  'FunctionExpression',
  'Identifier',
  'IfStatement',
  'LabeledStatement',
  'Literal',
  'LogicalExpression',
  'MemberExpression',
  'NewExpression',
  'ObjectExpression',
  'Program',
  'ReturnStatement',
  'ScopeBody',
  'SequenceExpression',
  'Statement',
  'SwitchCase',
  'SwitchStatement',
  'ThisExpression',
  'ThrowStatement',
  'TryStatement',
  'UnaryExpression',
  'UpdateExpression',
  'VariableDeclaration',
  'VariableDeclarator',
  'WhileStatement',
  'WithStatement',
];

// makeVisitors returns an object with a property keyed on each AST node type whose value is c.
exports.makeVisitors = function(c) {
  var visitors = {};
  for (var i = 0; i < types.length; ++i) {
    var type = types[i];
    visitors[type] = c;
  }
  return visitors;
};

// traverser is an AST visitor that programmatically traverses the AST node by inspecting its object
// structure (as opposed to following hard-coded paths).
exports.traverser = function(node, st, c) {
  for (var key in node) if (node.hasOwnProperty(key)) {
    var v = node[key];
    if (!v) continue;
    if (v instanceof Array) {
      for (var i = 0; i < v.length; ++i) {
        if (v[i].type) c(v[i], st);
        else exports.traverser(v[i], st, c);
      }
    } else if (typeof v == 'object' && !(v instanceof RegExp)) {
      c(v, st);
    }
  }
};

// traversers is an AST walker that uses the traverser visitor for all AST node types.
exports.traversers = exports.makeVisitors(exports.traverser);
