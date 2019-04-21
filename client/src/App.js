import React, { Component } from "react";
import styled, { css } from "styled-components";
import OperandCal from "./OperandCal";
import io from "socket.io-client";

const socket = io("http://192.168.43.183:3008");

socket.on("connection", () => {
  console.log("connect");
});

class App extends Component {
  state = {
    mathExpression: "",
    result: ""
  };

  operandCal = new OperandCal();

  render() {
    const { mathExpression } = this.state;
    socket.on("cal Result", req => {
      const { result } = req;
      this.setState({
        result: result
      });
    });

    return (
      <Container>
        <InputComponent
          value={mathExpression}
          onChange={this._handlingDelete}
          id="inputArea"
        />
        <ResultComponent value={this.state.result} />
        <InputContainer>
          {this.operandCal.element.map((val, i) => (
            <ValueComponent key={i} onClick={this._handlingButton} value={val}>
              {val}
            </ValueComponent>
          ))}
        </InputContainer>
      </Container>
    );
  }

  _handlingButton = e => {
    const { mathExpression } = this.state;
    const {
      target: { value }
    } = e;

    this._focusingInputArea();

    if (this._singleAction(value)) this._setExpression(value, mathExpression);
  };

  _focusingInputArea = () => {
    return document.getElementById("inputArea").focus();
  };

  _singleAction = input => {
    if (input === "CE") {
      this._initValue();
      return false;
    } else if (input === "=") {
      let { mathExpression } = this.state;
      mathExpression = mathExpression.replace("^", "**");
      console.log(mathExpression);
      socket.emit("request Cal", { mathExpression, type: 0 });
      return false;
    }
    return true;
  };

  _setExpression = (value, mathExpression) => {
    if (this.operandCal.isValid(value, mathExpression)) {
      this.setState({
        mathExpression: mathExpression + value
      });
    } else {
      alert("잘못된 수식을 입력하였습니다.");
    }
  };

  _isGetResult = inputValue => {
    if (inputValue === "=") return true;
    return false;
  };

  _initValue = () => {
    this.setState({
      mathExpression: "",
      result: ""
    });
  };

  _handlingDelete = e => {
    if (this.operandCal.isNumber(e.target.value))
      this.setState({
        mathExpression: e.target.value
      });
    else alert("문자를 입력하지 말아주세요!!");
  };
}

export default App;

const Container = styled.div`
  width: 500px;
  height: 800px;
  background-color: #393e42;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const ValueComponent = styled.button`
  background-color: rgb(202, 202, 202);
  width: 60px;
  height: 60px;
  font-size: 18px;
`;

const TextAreaCSS = css`
  width: 260px;
  height: 120px;
  margin-bottom: 30px;
  font-size: 18px;
  border: 4px solid grey;
  resize: none;
`;

const InputComponent = styled.textarea`
  ${TextAreaCSS}
`;

const ResultComponent = styled.textarea`
  ${TextAreaCSS}
  height:30px;
  margin-top: -30px;
`;
