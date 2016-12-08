import sugarss from 'sugarss'
import postcss from 'postcss'
import React from 'react'
import ReactDOM from 'react-dom'
import * as style from './style.sss'

class DemoArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
      output: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.transformToCSS = this.transformToCSS.bind(this);
  }

  componentDidMount() {
    this.transformToCSS(this.props.text)
  }

  componentWillMount() {
  }

  handleChange(event) {
    const css = event.target.value
    this.setState({error: false})
    this.transformToCSS(css)
  }

  transformToCSS(css) {
    this.setState({text: css})
    postcss().process(css, { parser: sugarss }).then((result) => {
      return new Promise((resolve, reject) => {
        result.warnings().forEach((warn) => {
          this.setState({error: true})
        })
        resolve(result.css)
      })
    }).then((css) => {
      this.setState({output: css})
    }).catch((e) => {
      this.setState({error: true})
    })
  }

  render() {
    console.log(style)
    return (
      <div>
        <textarea onChange={this.handleChange} className={style.src} value={this.state.text} />
        {this.state.error && <div>エラーっす</div>}
        <pre><code>{this.state.output}</code></pre>
      </div>
    )
  }
}

var initialText = `// Let's edit SugarSS
.foo .bar
  font-size: normal
  display: flex
`

ReactDOM.render(
  <DemoArea text={initialText} />,
  document.getElementById('demo-area')
);
