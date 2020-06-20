'use strict';

const subtract = "\u2212";
const divide = "\xF7";
const multiply = "\xD7";
const eraseLeft = "\u232B";

const decimalRegex = /\.\d*$/;
const operatorRegex = RegExp("[" + subtract + divide + multiply + "-]$");
const numberRegex = /[1-9]0+$/;

const defaultState = {
  output: "0",
  decimal: false,
  operator: "",
  done: true
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
    this.clear = this.clear.bind(this);
    this.backspace = this.backspace.bind(this);
    this.operator = this.operator.bind(this);
    this.number = this.number.bind(this);
    this.decimal = this.decimal.bind(this);
    this.equals = this.equals.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress);
  }
  clear(event) {
    if (this.state !== defaultState) {
      this.setState(Object.assign({}, defaultState));
    }
  }
  backspace() {
    if (this.state.output !== "0") {
      this.setState( state => {
        if (state.output.length === 1) {
          return Object.assign({}, defaultState);
        } else {
          const newOutput = state.output.slice(0, state.output.length - 1);
          const newOperator = newOutput.match(operatorRegex);
          return {
            output: newOutput,
            decimal: decimalRegex.test(newOutput),
            operator: newOperator ? newOperator : "",
            done: false
          };
        }
      });
    }
  }
  operator(event) {
    const value = typeof event === 'object' ? event.target.value : event;
    if (this.state.operator.slice(-1) !== value && this.state.output !== "-") {
      this.setState(state => {
        let newOutput;
        let newOperator;
        if (value !== subtract) {
          newOutput = state.output.slice(0, state.output.length - state.operator.length) + value;
          newOperator = value;
        } else if (state.output === "0") {
          newOutput = "-";
          newOperator = value;
        } else if (state.operator) {
          newOutput = state.output + "-";
          newOperator = state.operator + value;
        } else {
          newOutput = state.output + value;
          newOperator = state.operator + value;
        }
        return {
          output: newOutput,
          decimal: false,
          operator: newOperator,
          done: false
        }
      });
    }
  }
  number(event) {
    const value = typeof event === 'object' ? event.target.value : event;
  	this.setState(state => {
      let newOutput;
      if (state.decimal) {
        newOutput = state.output + value;
      } else if (state.output.slice(-1) !== "0") {
        newOutput = state.output + value;
      } else if (numberRegex.test(state.output)) {
        newOutput = state.output + value;
      } else {
        newOutput = state.output.slice(0, state.output.length - 1) + value;
      }
  		return {
        output: newOutput,
        operator: "",
        done: false
      }
  	});
  }
  decimal() {
  	if (!this.state.decimal) {
  		this.setState( state => ({
        output: state.output + (state.operator ? "0." : "."),
        decimal: true,
        operator: "",
        done: false
      }));
    }
  }
  equals() {
    if (!this.state.done) {
      this.setState( state => {
        let value = state.operator ? 
          state.output.slice(0, state.output.length - state.operator.length) :
          state.output;
        value = value.
          replace(RegExp(divide,"g"), "/").
          replace(RegExp(multiply,"g"), "*").
          replace(RegExp(subtract,"g"), "-");
        const newOutput = (Math.round(10000 * eval(value)) / 10000).toString();
        return {
          output: newOutput,
          decimal: decimalRegex.test(newOutput),
          operator: "",
          done: true
        }
      });
    }
  }
  keyPress(event) {
    event.preventDefault();
    switch (event.key) {
      case "Enter":
        this.equals();
        return;
      case "Escape":
        this.clear();
        return;
      case "Backspace":
        this.backspace();
        return;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.number(event.key);
        return;
      case "/":
        this.operator(divide);
        return;
      case "*":
        this.operator(multiply);
        return;
      case "-":
        this.operator(subtract);
        return;
      case "+":
        this.operator("+");
        return;
      case ".":
        this.decimal();
        return;
    }
  }
  render() {
    return (
    	React.createElement("div", {id: "grid"},
        React.createElement(Creator, null),
    		React.createElement("h1", {id: "display"}, this.state.output),
	    	React.createElement(Button, {className: "item gray", id: "clear", value: "AC", onClick: this.clear}),
        React.createElement(Button, {className: "item gray", id: "eraseLeft", value: eraseLeft, onClick: this.backspace}),
	    	React.createElement(Button, {className: "item orange", id: "divide", value: divide ,onClick: this.operator}),
	    	React.createElement(Button, {className: "item gray", id: "seven", value: "7", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "eight", value: "8", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "nine", value: "9", onClick: this.number}),
	    	React.createElement(Button, {className: "item orange", id: "multiply", value: multiply, onClick: this.operator}),
	    	React.createElement(Button, {className: "item gray", id: "four", value: "4", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "five", value: "5", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "six", value: "6", onClick: this.number}),
	    	React.createElement(Button, {className: "item orange", id: "subtract", value: subtract, onClick: this.operator}),
	    	React.createElement(Button, {className: "item gray", id: "one", value: "1", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "two", value: "2", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "three", value: "3", onClick: this.number}),
	    	React.createElement(Button, {className: "item orange", id: "add", value: "+", onClick: this.operator}),
	    	React.createElement(Button, {className: "item gray", id: "zero", value: "0", onClick: this.number}),
	    	React.createElement(Button, {className: "item gray", id: "decimal", value: ".", onClick: this.decimal}),
	    	React.createElement(Button, {className: "item orange", id: "equals", value: "=", onClick: this.equals})
    	)
    );
  }
}

class Creator extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return React.createElement("p", null, "Created by Alex");
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return React.createElement("button", this.props, this.props.value);
  }
}

ReactDOM.render(
	React.createElement(App, null),
	document.getElementById("root")
);