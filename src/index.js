const sugarss      = require('sugarss')
const postcss      = require('postcss')
const React = require('react');
const ReactDOM = require('react-dom');

class DemoArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
      output: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  handleChange(event) {
    const css = event.target.value
    this.setState({text: css})
    postcss().process(css, { parser: sugarss }).then((result) => {
      return new Promise((resolve, reject) => {
        result.warnings().forEach((warn) => {
          console.warn(warn.toString())
        })
        resolve(result.css)
      })
    }).then((css) => {
      this.setState({output: css})
    })
  }

  render() {
    return (
      <div>
        <textarea onChange={this.handleChange} value={this.state.text} />
        <pre><code>{this.state.output}</code></pre>
      </div>
    )
  }
}

var initialText = (function () {/*
// Let's edit SugarSS
.foo .bar
  font-size: normal
  display: flex
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

ReactDOM.render(
  <DemoArea text={initialText} />,
  document.getElementById('demo-area')
);
