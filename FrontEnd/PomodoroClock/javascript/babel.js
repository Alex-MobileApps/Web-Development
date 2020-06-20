"use strict";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = defaultState;
		this.setSession = this.setSession.bind(this);
		this.setBreak = this.setBreak.bind(this);
		this.setStart = this.setStart.bind(this);
		this.reset = this.reset.bind(this);
		this.killTimer = this.killTimer.bind(this);
	}
	setSession(length) {
		if (!this.state.isRunning) {
			this.setState(state => {
				const newState = {
					sessionLength: length
				};
				if (state.isSession) {
					newState.remaining = length * 60;
				}
				return newState;
			});
		}
	}
	setBreak(length) {
		if (!this.state.isRunning) {
			this.setState(state => {
				const newState = {
					breakLength: length
				};
				if (!state.isSession) {
					newState.remaining = length * 60;
				}
				return newState;
			});
		}
	}
	setStart() {
		const isRunning = this.state.isRunning;
		this.setState({
			isRunning: !isRunning
		});
		if (!isRunning) {
			timer = setInterval(() => {
				this.setState(state => {
					if (!state.isRunning) {
						this.killTimer();
						return {
							isRunning: false
						};
					}
					if (state.remaining !== 0) {
						return {
							remaining: state.remaining - 1
						};
					} else if (state.isSession) {
						this.audioBeep.play();
						return {
							isSession: false,
							remaining: state.breakLength * 60
						};
					} else {
						this.audioBeep.play();
						return {
							isSession: true,
							remaining: state.sessionLength * 60 
						};
					}
				});
			}, 1000);
		}
	}
	reset() {
		this.killTimer();
		this.setState(defaultState);
	}
	killTimer() {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;
		}
		this.audioBeep.pause();
		this.audioBeep.currentTime = 0;
	}
	render() {
		return (
			<>
				<div className="wrapper">
					<div id="clock-wrapper" className={this.state.remaining < 60 ? "danger" : ""}>
						<Clock value={this.state.remaining} isSession={this.state.isSession}/>
					</div>
					<div id="button-wrapper">
						<button id="start_stop" className="text-sm text-light" onClick={this.setStart}>{this.state.isRunning ? "Stop" : "Start"}</button>
						<button id="reset" className="text-sm text-light" onClick={this.reset}>Reset</button>
					</div>
				</div>
				<div className="wrapper">
					<p id="session-label" className="text-sm text-light text-center">Session Length</p>
					<Stepper
						id="session-stepper"
						leftID="session-decrement"
						middleID="session-length"
						rightID="session-increment"
						value={this.state.sessionLength}
						setStepper={this.setSession} />
					<p id="break-label" className="text-sm text-light text-center">Break Length</p>
					<Stepper
						id="break-stepper"
						leftID="break-decrement"
						middleID="break-length"
						rightID="break-increment"
						value={this.state.breakLength}
						setStepper={this.setBreak} />
					<p id="author-label" className="text-sm text-light text-center">Created by Alex</p>
				</div>
				<audio 
					id="beep"
					preload="auto"
					src="https://goo.gl/65cBl1"
					ref={audio => {this.audioBeep = audio;}} />
			</>
		);
	}
}

class Stepper extends React.Component {
	constructor(props) {
		super(props);
		this.decrement = this.decrement.bind(this);
		this.increment = this.increment.bind(this);
	}
	decrement() {
		const value = this.props.value;
		if (value !== 1) {
			this.props.setStepper(value - 1);
		}
	}
	increment() {
		const value = this.props.value;
		if (value !== 60) {
			this.props.setStepper(value + 1);
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.value !== this.props.value;
	}
	render() {
		return (
			<div className="stepper">
				<button id={this.props.leftID} className="stepper-button text-sm text-light" onClick={this.decrement}>-</button>
				<p id={this.props.middleID} className="stepper-text text-sm">{this.props.value}</p>
				<button id={this.props.rightID} className="stepper-button text-sm text-light" onClick={this.increment}>+</button>
			</div>
		);
	}
}

class Clock extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return nextProps !== this.props;
	}
	render() {
		let value = this.props.value;
		let minutes = Math.floor(value / 60);
		let seconds = value % 60;
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		if (seconds < 10) {
			seconds = `0${seconds}`
		}
		value = `${minutes}:${seconds}`;
		return (
			<div id="clock">
				<p id="timer-label" className="text-sm text-light text-center">{this.props.isSession ? "Session" : "Break"}</p>
				<p id="time-left" className="text-lg text-light text-center">{value}</p>
			</div>
		);
	}
}

let timer;

const defaultState = {
	sessionLength: 25,
	breakLength: 5,
	isRunning: false,
	isSession: true,
	remaining: 1500
}

ReactDOM.render(<App />, document.getElementById("app"));