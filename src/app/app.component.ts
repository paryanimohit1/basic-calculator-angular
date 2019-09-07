import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';
  currentValue: string = "0";
  lastNum: string = "";
  errorMessage: string = "";
  finalResult: number;

  keydown(event) {
    let value = event.target.value;
    let lastChar = value.charAt(value.length - 1);
    let key = event.key;
    
    if (this.finalResult && key != "Enter") {
      this.finalResult = undefined;
      this.currentValue = "";
    }

    if (!isNaN(key)) {
      this.lastNum += key;
    } else if (key == ".") {
      if (this.lastNum.indexOf(key) != -1) {
        return false;
      } else if (lastChar == ".") {
        return false;
      }
      else if (lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar == "*") {
        event.target.value += 0;
        this.lastNum = "0.";
      } else if (!isNaN(lastChar)) {
        this.lastNum += key;
      }
    } else if (key == "+" || key == "-" || key == "/" || key == "*") {
      if (lastChar == ".") {
        return false;
      }
      this.lastNum = "";
      if (lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar == "*") {
        event.target.value = value.substring(0, value.length - 1);
      }
    } else if (key == "Enter") {
      this.calculateResult();
    }
    /* if last element of string is + - * / and current key is also an operator then replace current operator by */
  }

  buttonClicked(event) {
    try {
      if (event.target.localName == "button") {
        let value = event.target.value;
        if (this.finalResult !=undefined && value != "=") {
          this.finalResult = undefined;
          this.currentValue = "";
        }
        switch (isNaN(value)) {
          case true: {
            this.charClicked(event);
            break;
          }
          case false: {
            if (this.currentValue == "0") {
              this.currentValue = value;
              this.lastNum = value;
            } else {
              this.currentValue += value;
              this.lastNum += value;
            }
            break;
          }
        }
        console.log(event.target.value);
        console.log(this.currentValue);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  charClicked(event) {
    try {
      let value = this.currentValue;
      let lastChar = value.charAt(value.length - 1);
      let key = event.target.value;
      if (key == "=") {
        this.calculateResult();
      } else if (key == ".") {
        if (this.lastNum.indexOf(key) != -1) {
          return false;
        } else if (lastChar == key) {
          return false;
        }
        else if (lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar == "*") {
          this.currentValue += "0.";
          this.lastNum = "0.";
        } else {
          this.currentValue += key;
          this.lastNum += key;
        }
      } else if (key == "+" || key == "-" || key == "/" || key == "*") {
        if (lastChar == ".") {
          return false;
        }
        this.lastNum = "";
        if (lastChar == "+" || lastChar == "-" || lastChar == "/" || lastChar == "*") {
          this.currentValue = this.currentValue.substring(0, this.currentValue.length - 1);
        }
        this.currentValue += key;
      }
    } catch (e) {
      console.log(e);
    }
  }

  calculateResult() {
    try {
      if (this.currentValue.length == 1 && this.currentValue == "0") {
        this.showErrorMessage("noInput");
        this.finalResult = undefined;
      } else if (isNaN(Number(this.currentValue.charAt(this.currentValue.length - 1)))) {
        this.showErrorMessage("invalidInput");
        this.finalResult = undefined;
      } else {
        let val = this.currentValue;
        let result = 0;
        let operand1: number;
        let operand2: number;
        let operator = "";
        let previousIndex = 0;
        // var i = 0;
        for (var i = 0; i <= val.length; i++) {
          if (isNaN(Number(val.charAt(i))) && val.charAt(i) != "." || i == val.length) {
            if (!operand1) {
              operand1 = Number(val.substring(previousIndex, i));
            } else {
              operand2 = Number(val.substring(previousIndex, i));
            }
            if (!isNaN(operand1) && !isNaN(operand2)) {
              switch (operator) {
                case "+":
                  {
                    result = operand1 + operand2;
                    break;
                  }
                case "-":
                  {
                    result = operand1 - operand2;
                    break;
                  }
                case "*":
                  {
                    result = operand1 * operand2;
                    break;
                  }
                case "/":
                  {
                    result = operand1 / operand2;
                    break;
                  }
              }
              operand1 = result;
              operand2 = undefined;
            }
            if (i != val.length) {
              previousIndex = i + 1;
              operator = val.charAt(i);
            }
          }
        }
        this.finalResult = result;
      }
    } catch (e) {
      console.log(e);
    }
  }
  /*
  1-9 => replace 0 with 1-9
  */

  showErrorMessage(messageType: string) {
    switch (messageType) {
      case "invalidInput": {
        this.errorMessage = "Please enter a valid input"; break;
      }
      case "noInput": {
        this.errorMessage = "Please enter an input"; break;
      }
    }
    setTimeout(() => this.errorMessage = "", 4000);
  }
}