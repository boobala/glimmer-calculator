import Component, { tracked } from '@glimmer/component';

export default class Calculator extends Component {
  private expSymbol: Array<string> = [ '+', '-', '/', '*', '%', '='];
  private equalSym: string = '=';
  private _consArr: Array<number> = [];
  private _opArr: Array<number> = [];
  @tracked private result: number = 0;

  execute = (input) => {
    let output = 0;
    let consArr = this._consArr;
    if(this.expSymbol.indexOf(input) > -1) {
      this._opArr.push(input);
      if(this._opArr.length !== 2) {
        output = this.result;
      }
    } else {
      if(this._opArr.length === 0 && this._consArr.length !== 0) {
        let lastEle =  consArr.pop();
        input = `${lastEle}${input}`;
      }
      this._consArr.push(input);
      output = parseFloat(input);
    }
    output = this.computeResult() || output;
    this.result = output;
  }
  computeResult = () => {
    let constArr = this._consArr || [];
    let opArr = this._opArr || [];
    let _output = 0;
    if(constArr.length === 2 && opArr.length === 2) {
      _output = this.calculate(constArr, opArr[0]);
      this._consArr = [ _output ];
      if(opArr[1] === '=') {
        this._opArr = [];
      } else {
        this._opArr = [ opArr[1] ];
      }
    }
    return _output;
  }
  calculate = (_consts, _operator) => {
    let _output = 0;
    let a = parseFloat(_consts[0]);
    let b = parseFloat(_consts[1]);
    switch(_operator) {
      case '+': _output = a + b; break;
      case '-': _output = a - b; break;
      case '*': _output = a * b; break;
      case '/': _output = a / b; break;
      case '%': _output = a % b; break;
    }
    return _output;
  }
  clearResult = () => {
    this.result = 0;
    this._consArr = [];
    this._opArr = [];
  }
  toggleSign = () => {
    let _result = this.result;
    if(_result > 0) {
      _result = -Math.abs(_result);
    } else {
      _result = Math.abs(_result);
    }
    this.result = _result;
  }
}
