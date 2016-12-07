const sugarss      = require('sugarss')
const postcss      = require('postcss')

function runPostcss () {
  const css = document.getElementById('src').textContent

  postcss().process(css, { parser: sugarss }).then(function (result) {
    result.warnings().forEach(function (warn) {
        console.warn(warn.toString())
    })
    document.getElementById('dist').textContent = result.css
  })
}

document.getElementById('src').addEventListener('keypress', runPostcss)
runPostcss()
