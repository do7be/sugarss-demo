import sugarss from 'sugarss'
import postcss from 'postcss'
import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import Highlight from 'react-highlight'
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.transformToCSS = this.transformToCSS.bind(this);
    this.nextSelection = null;
  }

  componentDidMount() {
    this.transformToCSS(this.props.text)
  }

  componentWillMount() {
  }

  componentDidUpdate() {
    if (this.nextSelection) {
      this.input.selectionStart = this.input.selectionEnd = this.nextSelection
      this.nextSelection = null
    }
  }

  handleKeyDown(event) {
    const keyCode = event.keyCode || event.which;

    if (keyCode == 9) {
      event.preventDefault()
      const start = event.target.selectionStart
      const end = event.target.selectionEnd
      const css = this.state.text.substring(0, start) + '  ' + this.state.text.substring(end)
      this.transformToCSS(css)
      this.nextSelection = start + 2
    }
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
    return (
      <div>
        <header className={style.header}>SugarSS Demo</header>
        <section className={style.contents}>
          <div className={style.srcContainer}>
            <textarea onKeyDown={this.handleKeyDown} onChange={this.handleChange} className={style.src} value={this.state.text} ref={ref => {this.input = ref}} />
          </div>
          <div className={style.distContainer}>
            <Highlight className={classNames('css', style.dist)}>
              {this.state.output}
            </Highlight>
          </div>
        </section>
        <section className={classNames(style.alert, this.state.error && style.on)}>
          <div className={style.alertMessage}>parse error</div>
        </section>
        <footer></footer>
      </div>
    )
  }
}

const initialText = `// Let's edit SugarSS
.foo .bar
  display: flex
  font-size: normal
  background-image: url("./do7be.jpg")
`

ReactDOM.render(
  <DemoArea text={initialText} />,
  document.getElementById('demo-area')
);
