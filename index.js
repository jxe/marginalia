var preload = {
  "react": { default: (window.React = require('react')) },
  "npm:babel-core@5": require('babel-core'),
  "firebase": { default: require('firebase') }
}
// window.React = require('react')
// var Babel = require('babel-core')
// var Firebase = require('firebase')

var ReactDOM = require('react-dom')
var ObjectInspector = require('react-object-inspector')

SystemJS.config({
  transpiler:"babel",
  meta:{ "*.jsx":{} },
  map: { 'babel': 'npm:babel-core@5' },
  // packages:{"./bonobo":{defaultJSExtensions:false, defaultExtension: false}}
  packages:{"./lib":{defaultExtension: false}}
});
// SystemJS.set("react", System.newModule({default:React}))
// SystemJS.set(System.normalizeSync('npm:babel-core@5'), System.newModule(Babel))
// SystemJS.set(System.normalizeSync("firebase"), SystemJS.newModule({default:Firebase}))
for (var m in preload) {
  SystemJS.set(System.normalizeSync(m), System.newModule(preload[m]))
}

window.OUTPUT = function(result){
  var jsx = result && result.type && result.props && result
  var output = document.createElement('div')
  output.class = 'output'
  document.getElementById(window.blockId).appendChild(output)
  ReactDOM.render(jsx ||
    React.createElement(ObjectInspector, { data: result }),
    output
  )
}

var blocks = [].slice.call(document.querySelectorAll('[rawcode]'))
var code = blocks.map(function(b){
  return "window.blockId=\""+b.id+"\"; "+b.getAttribute('rawcode')+"; "
}).join("\n")
SystemJS.define( System.normalizeSync("./blocks.jsx"), code)

// SystemJS.config({
//   transpiler:"babel",
//   meta:{ "*.jsx":{} },
//   packages:{"./lib":{defaultExtension: false}}
// });
//
// var ReactDOM = require('react-dom')
// var ObjectInspector = require('react-object-inspector')
//
// window.OUTPUT = function(result){
//   var jsx = result && result.type && result.props && result
//   var output = document.createElement('div')
//   output.class = 'output'
//   document.getElementById(window.blockId).appendChild(output)
//   ReactDOM.render(jsx ||
//     React.createElement(ObjectInspector, { data: result }),
//     output
//   )
// }
//
// var blocks = [].slice.call(document.querySelectorAll('[rawcode]'))
// var code = blocks.map(function(b){
//   return "window.blockId=\""+b.id+"\"; "+b.getAttribute('rawcode')+"; "
// }).join("\n")
// SystemJS.define( System.normalizeSync("./blocks.jsx"), code)
