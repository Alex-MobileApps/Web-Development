"use strict";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Created by Alex",
      bank: false,
      power: true };

    this.setDisplay = this.setDisplay.bind(this);
    this.setBank = this.setBank.bind(this);
    this.setPower = this.setPower.bind(this);
  }
  setDisplay(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }
  setBank() {
    this.setState(state => {
      return {
        display: "Created By Alex",
        bank: !state.bank };

    });
  }
  setPower() {
    this.setState(state => {
      return {
        display: "Created by Alex",
        power: !state.power };

    });
  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "drum-grid" },
      (this.state.bank ? bankTwo : bankOne).map(value => React.createElement(DrumPad, { className: "drum-pad", event: value.event, id: value.id, url: value.url, power: this.state.power, setDisplay: this.setDisplay }))),

      React.createElement("div", { id: "drum-settings" },
      React.createElement("p", { id: "display" }, this.state.display),
      React.createElement(Control, { id: "power", text: "Power", on: this.state.power, click: this.setPower }),
      React.createElement(Control, { id: "sound-set", text: "Alt. Sounds", on: this.state.bank, click: this.setBank }))));



  }}


const Control = props => {
  return (
    React.createElement("div", { id: props.id, className: "control", onClick: props.click },
    React.createElement("p", null, props.text),
    React.createElement("div", { className: props.on ? "controlOn" : "controlOff" },
    React.createElement("div", { className: props.on ? "controlRight" : "controlLeft" }))));



};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  }
  playSound(event) {
    if (this.props.power) {
      const sound = document.getElementById(this.props.event);
      sound.currentTime = 0;
      sound.play();
      this.props.setDisplay(this.props.id);
    }
  }
  handleKeydown(event) {
    if (event.code === `Key${this.props.event}`) {
      this.playSound();
    }
  }
  render() {
    return (
      React.createElement("div", { id: this.props.id, className: "drum-pad", onClick: this.playSound },
      React.createElement("audio", { id: this.props.event, className: "clip", src: this.props.url }),
      this.props.event));


  }}


const bankOne = [
{
  event: "Q",
  id: "Heater 1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  event: "W",
  id: "Heater 2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  event: "E",
  id: "Heater 3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  event: "A",
  id: "Heater 4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  event: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  event: "D",
  id: "Open HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  event: "Z",
  id: "Kick n\' Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  event: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  event: "C",
  id: "Closed HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



const bankTwo = [
{
  event: "Q",
  id: "Chord 1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  event: "W",
  id: "Chord 2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  event: "E",
  id: "Chord 3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  event: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },

{
  event: "S",
  id: "Open HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  event: "D",
  id: "Closed HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  event: "Z",
  id: "Punchy Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  event: "X",
  id: "Side Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  event: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];



ReactDOM.render(React.createElement(App, null), document.getElementById("root"));