export default class OperandCal {
  element = [
    "cos",
    "sin",
    "^",
    "CE",
    7,
    8,
    9,
    "/",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "-",
    0,
    ".",
    "=",
    "+"
  ];

  isNumber = inputValue => {
    return !isNaN(inputValue);
  };

  isValid = (inputValue, mathExpression) => {
    const prevValue = mathExpression.substr(mathExpression.length - 1);

    return this.checkValid(inputValue, prevValue);
  };

  checkValid = (inputValue, prevValue) => {
    if (this.isNumber(inputValue)) {
      return true;
    } else if (this.isOperand(inputValue)) {
      return this.appendOperand(inputValue, prevValue);
    } else if (this.isTrigonometricFunction(inputValue)) {
      if (prevValue === "") return true;
      if (prevValue >= 0 && prevValue <= 9) return false;
    }
    return true;
  };

  isOperand = inputValue => {
    if (
      inputValue === "+" ||
      inputValue === "/" ||
      inputValue === "-" ||
      inputValue === "*" ||
      inputValue === "^"
    )
      return true;
    return false;
  };

  isTrigonometricFunction = inputValue => {
    if (inputValue === "cos" || inputValue === "sin") return true;
    return false;
  };

  appendOperand = (inputValue, prevValue) => {
    if (inputValue === "-") {
      if (prevValue === "-") return false;
      return true;
    } else if (this.isOperand(prevValue)) {
      return false;
    }
    return true;
  };
}
