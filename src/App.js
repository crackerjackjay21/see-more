import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const seeMoreRef = React.createRef();
const NUMBER_OF_ROWS = 2;

const buttons = [
  "Text 1",
  "Text 2",
  "Text 3",
  "Text 4",
  "Text 5",
  "Text 6",
  "Text 7",
  "Text 8",
  "Text 9",
  "Text 10",
  "Text 11",
  "Text 12",
];
const Button = () => {
  return (
    <div className="btn-container" ref={seeMoreRef}>
      {buttons.map((btn) => {
        return (
          <div key={btn} className="btn-wrapper">
            <span className="btn-text">{btn}</span>
          </div>
        );
      })}
    </div>
  );
};

const Buttons = ({ numberOfBtn = 0 }) => {
  return (
    <div className="btn-container">
      {buttons.map((btn, index) => {
        if (numberOfBtn && numberOfBtn > index)
          return (
            <div key={btn} className="btn-wrapper">
              <span className="btn-text">{btn}</span>
            </div>
          );
        else if (numberOfBtn === index && buttons.length !== index + 1)
          return (
            <div key={btn} className="btn-wrapper link">
              <span className="">See More</span>
            </div>
          );
        else if (buttons.length === index + 1 && numberOfBtn === index)
          return (
            <div key={btn} className="btn-wrapper">
              <span className="btn-text">{btn}</span>
            </div>
          );
      })}
    </div>
  );
};

class SeeMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBtn: 0,
    };
  }

  calculatePods = () => {
    const node = seeMoreRef.current;
    if (!node) return null;
    const children = node.children;
    const comparisionWidth = window.innerWidth * NUMBER_OF_ROWS;
    let showPods = 0;
    let btnWidth = 0;
    for (let i = 0; i < children.length; i++) {
      btnWidth = btnWidth + children[i].clientWidth + 20 + 15;
      if (comparisionWidth > btnWidth) {
        showPods++;
      }
    }
    console.log("Total pods to show", showPods - 1);
    this.setState({
      numberOfBtn: showPods - 1,
    });
  };

  updatePods = () => {
    this.setState({
      numberOfBtn: 0,
    });
    this.calculatePods();
  };

  componentDidMount() {
    this.calculatePods();
    window.addEventListener("resize", this.updatePods);
  }

  render() {
    const { numberOfBtn = 0 } = this.state;
    return (
      <div>
        {numberOfBtn ? <Buttons numberOfBtn={numberOfBtn} /> : <Button />}
      </div>
    );
  }
}

export default SeeMore;
