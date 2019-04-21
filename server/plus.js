import app, { startServer } from "./server";

startServer(3002, "plus");

app.use("/", (req, res) => {
  let {
    query: { value }
  } = req;

  value = checkTriangle(value);

  const plusResult = eval(value);
  console.log(plusResult);
  res.send(`${plusResult}`);
});

const checkTriangle = value => {
  let SinValue = calculatorSin(value);
  const cosValue = calculatorCos(SinValue);
  return cosValue;
};

const calculatorSin = value => {
  let index = value.indexOf("sin");
  const StartIndex = index;
  if (index >= 0) {
    while (isNotOperand(value.charAt(index))) index += 1;
    const changeValue = Math.sin(value.substring(StartIndex + 3, index) % 360);

    value =
      value.substring(0, StartIndex - 1) + changeValue + value.substring(index);
  }
  return value;
};

const isNotOperand = value => {
  if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "**" ||
    value === "" ||
    value === "/"
  )
    return false;
  return true;
};

const calculatorCos = value => {
  let index = value.indexOf("cos");
  const StartIndex = index;
  if (index >= 0) {
    while (isNotOperand(value.charAt(index))) index += 1;
    const changeValue = Math.cos(value.substring(StartIndex + 3, index));

    value =
      value.substring(0, StartIndex - 1) + changeValue + value.substring(index);
  }
  return value;
};
