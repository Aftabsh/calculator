import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  currentNumber: string = "0";
  // Variables to store the first operand and the operator
  firstOperand: number = 0;
  operator: string = "";
  // Check if the user is going to enter the second number
  waitForSecondNumber = false;
  // Hide action buttons when result is shown
  showOperators = true;



  /**
   * Add an operand to the display including decimals
   * @param operand
   */
  public getNumber(operand: string): void {
    // Only add decimal point if there is no decimal point in the current number already
    if (operand === "." && this.currentNumber.indexOf(".") > -1) {
      return;
    }
    if (this.waitForSecondNumber) {
      this.currentNumber = operand;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === "0"
        ? (this.currentNumber = operand)
        : (this.currentNumber += operand);
    }
  }

  /**
   * Calculate the result of the operation
   * @param operator
   * @param secondOperand
   * @returns result
   */
  private calculate(operator: string, secondOperand: number): number | string {
    this.showOperators = false;
    switch (operator) {
      case "+":
        return Math.round((this.firstOperand += secondOperand) * 100) / 100;
      case "-":
        return Math.round((this.firstOperand -= secondOperand) * 100) / 100;
      case "*":
        return Math.round((this.firstOperand *= secondOperand) * 100) / 100;
      case "/":
        if (this.firstOperand === 0 && secondOperand === 0) {
          return "Infinity";
        }
        return Math.round((this.firstOperand /= secondOperand) * 100) / 100;
      case "=":
        return secondOperand;
      default:
        return 0;
    }
  }

  /**
   * Allow the user to enter an operator and a second number
   * @param operator
   */
  public getOperation(operator: string): void {
    // When the user clicks an operator, we save the current number in firstOperand, and then clear the current number.
    // in order to have a better experience to the user
    let firstNumber = this.currentNumber;
    this.currentNumber = "";

    if (this.firstOperand === null) {
      this.firstOperand = Number(firstNumber);
    } else if (this.operator) {
      const result = this.calculate(this.operator, Number(firstNumber));
      this.currentNumber = String(result);
      this.firstOperand = Number(result);
    }
    this.operator = operator;
    this.waitForSecondNumber = true;
  }

  /**
   * Clear the calculator display
   */
  public clearCalculator(): void {
    this.currentNumber = "0";
    this.firstOperand = 0;
    this.operator = "";
    this.waitForSecondNumber = false;
    this.showOperators = true;
  }

}
