'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	input: placeholder,
    	large: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
  	this.setState({
  		input: event.target.value
  	});
  }

  handleClick(event) {
  	let newLarge;
  	if (event.target.id === "Editor") {
  		newLarge = this.state.large === "editor" ? "" : "editor";
  	} else {
  		newLarge = this.state.large === "previewer" ? "" : "previewer";
  	}
  	this.setState(state => {
  		return {
  			large: newLarge
  		}
  	});
  }

  render() {
    return (
    	<div>
    		{this.state.large !== "previewer" && <Editor input={this.state.input} large={this.state.large === "editor"} handleChange={this.handleChange} handleClick={this.handleClick} />}
    		{this.state.large !== "editor" && <Previewer input={this.state.input} large={this.state.large === "previewer"} handleClick={this.handleClick} />}
        <footer>Created by Alex</footer>
    	</div>
    );
  }
}

class Editor extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const aClass = this.props.large ? "wrapper wrapper-large" : "wrapper wrapper-small";
		return (
			<div className={aClass}>
				<Toolbar name="Editor" handleClick={this.props.handleClick} large={this.props.large} />
				<textarea id="editor" onChange={this.props.handleChange}>{this.props.input}</textarea>
			</div>
		);
	}
}

class Previewer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const aClass = this.props.large ? "wrapper wrapper-large" : "wrapper wrapper-small";
		return (
			<div className={aClass}>
				<Toolbar name="Previewer" handleClick={this.props.handleClick} large={this.props.large} />
        <div id="preview" dangerouslySetInnerHTML={{__html:marked(this.props.input)}} />
			</div>
		);
	}
}

const Toolbar = (props) => {
	const icon = props.large ? "fa-compress-arrows-alt" : "fa-expand-arrows-alt";
	return (
		<div className="toolbar">
			<p>{props.name}</p>
			<i id={props.name} className={`fas ${icon}`} onClick={props.handleClick} />
		</div>
	);
}

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://alex-mobileapps.github.io), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

ReactDOM.render(<App />, document.getElementById("root"));