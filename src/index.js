const autoprefixer = require('autoprefixer')
const postcss      = require('postcss')

function runPostcss () {
  const css = document.getElementById('src').textContent

  postcss([ autoprefixer ]).process(css).then(function (result) {
    console.log(css)
    result.warnings().forEach(function (warn) {
        console.warn(warn.toString())
    })
    console.log(result.css)
    document.getElementById('dist').textContent = result.css
  })
}

document.getElementById('src').addEventListener('keypress', runPostcss)
runPostcss()
