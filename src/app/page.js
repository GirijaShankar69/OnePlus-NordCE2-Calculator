"use client"

import { useState } from "react"
import { Plus, Minus, X, Divide, Percent, SquareIcon as SquareRoot, ChevronUp, ChevronDown } from "lucide-react"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
  const [memory, setMemory] = useState(0)
  const [isScientific, setIsScientific] = useState(false)
  const [degreeMode, setDegreeMode] = useState(true) // true for degrees, false for radians

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (operator === "+") {
      return firstOperand + inputValue
    } else if (operator === "-") {
      return firstOperand - inputValue
    } else if (operator === "*") {
      return firstOperand * inputValue
    } else if (operator === "/") {
      return firstOperand / inputValue
    } else if (operator === "%") {
      return firstOperand % inputValue
    } else if (operator === "pow") {
      return Math.pow(firstOperand, inputValue)
    } else if (operator === "yroot") {
      return Math.pow(firstOperand, 1 / inputValue)
    }

    return inputValue
  }

  const handleEquals = () => {
    if (!operator) return

    const inputValue = Number.parseFloat(display)
    const result = performCalculation()

    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handlePercentage = () => {
    const currentValue = Number.parseFloat(display)
    const percentValue = currentValue / 100
    setDisplay(String(percentValue))
  }

  const handlePlusMinus = () => {
    const currentValue = Number.parseFloat(display)
    setDisplay(String(-1 * currentValue))
  }

  // Scientific operations
  const handleScientificOperation = (operation) => {
    const currentValue = Number.parseFloat(display)
    let result

    switch (operation) {
      case "sin":
        result = degreeMode ? Math.sin((currentValue * Math.PI) / 180) : Math.sin(currentValue)
        break
      case "cos":
        result = degreeMode ? Math.cos((currentValue * Math.PI) / 180) : Math.cos(currentValue)
        break
      case "tan":
        result = degreeMode ? Math.tan((currentValue * Math.PI) / 180) : Math.tan(currentValue)
        break
      case "asin":
        result = degreeMode ? (Math.asin(currentValue) * 180) / Math.PI : Math.asin(currentValue)
        break
      case "acos":
        result = degreeMode ? (Math.acos(currentValue) * 180) / Math.PI : Math.acos(currentValue)
        break
      case "atan":
        result = degreeMode ? (Math.atan(currentValue) * 180) / Math.PI : Math.atan(currentValue)
        break
      case "log":
        result = Math.log10(currentValue)
        break
      case "ln":
        result = Math.log(currentValue)
        break
      case "sqrt":
        result = Math.sqrt(currentValue)
        break
      case "cbrt":
        result = Math.cbrt(currentValue)
        break
      case "square":
        result = Math.pow(currentValue, 2)
        break
      case "cube":
        result = Math.pow(currentValue, 3)
        break
      case "factorial":
        result = factorial(currentValue)
        break
      case "exp":
        result = Math.exp(currentValue)
        break
      case "1/x":
        result = 1 / currentValue
        break
      case "pi":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      default:
        return
    }

    setDisplay(String(result))
    setWaitingForSecondOperand(true)
  }

  // Memory functions
  const handleMemory = (operation) => {
    const currentValue = Number.parseFloat(display)

    switch (operation) {
      case "mc": // Memory clear
        setMemory(0)
        break
      case "mr": // Memory recall
        setDisplay(String(memory))
        setWaitingForSecondOperand(true)
        break
      case "m+": // Memory add
        setMemory(memory + currentValue)
        setWaitingForSecondOperand(true)
        break
      case "m-": // Memory subtract
        setMemory(memory - currentValue)
        setWaitingForSecondOperand(true)
        break
      default:
        return
    }
  }

  // Helper function for factorial
  const factorial = (n) => {
    if (n < 0) return Number.NaN
    if (n === 0 || n === 1) return 1

    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  // Toggle between degrees and radians
  const toggleAngleMode = () => {
    setDegreeMode(!degreeMode)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Brand header */}
        <div className="bg-blue-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">OnePlus Nord CE2</h1>
              <p className="text-sm opacity-80">Calculator</p>
            </div>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="rounded-full bg-blue-700 p-2 text-white hover:bg-blue-800"
            >
              {isScientific ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="bg-gray-100 p-6">
          <div className="flex h-20 items-end justify-end rounded-lg bg-white p-4 text-right text-4xl font-light shadow-inner">
            {display}
          </div>
          {isScientific && (
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-gray-500">Memory: {memory}</span>
              <span className="text-gray-500">Mode: {degreeMode ? "DEG" : "RAD"}</span>
            </div>
          )}
        </div>

        {/* Scientific Keypad (Conditional) */}
        {isScientific && (
          <div className="grid grid-cols-5 gap-1 bg-gray-100 p-2">
            {/* Row 1 - Scientific */}
            <button
              onClick={() => handleMemory("mc")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              MC
            </button>
            <button
              onClick={() => handleMemory("mr")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              MR
            </button>
            <button
              onClick={() => handleMemory("m+")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              M+
            </button>
            <button
              onClick={() => handleMemory("m-")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              M-
            </button>
            <button
              onClick={toggleAngleMode}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              {degreeMode ? "DEG" : "RAD"}
            </button>

            {/* Row 2 - Scientific */}
            <button
              onClick={() => handleScientificOperation("sin")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              sin
            </button>
            <button
              onClick={() => handleScientificOperation("cos")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              cos
            </button>
            <button
              onClick={() => handleScientificOperation("tan")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              tan
            </button>
            <button
              onClick={() => handleScientificOperation("log")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              log
            </button>
            <button
              onClick={() => handleScientificOperation("ln")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              ln
            </button>

            {/* Row 3 - Scientific */}
            <button
              onClick={() => handleScientificOperation("asin")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              sin<sup>-1</sup>
            </button>
            <button
              onClick={() => handleScientificOperation("acos")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              cos<sup>-1</sup>
            </button>
            <button
              onClick={() => handleScientificOperation("atan")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              tan<sup>-1</sup>
            </button>
            <button
              onClick={() => handleScientificOperation("sqrt")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              <SquareRoot size={16} />
            </button>
            <button
              onClick={() => handleScientificOperation("cbrt")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              ∛
            </button>

            {/* Row 4 - Scientific */}
            <button
              onClick={() => handleScientificOperation("square")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              x²
            </button>
            <button
              onClick={() => handleScientificOperation("cube")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              x³
            </button>
            <button
              onClick={() => handleOperator("pow")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              x<sup>y</sup>
            </button>
            <button
              onClick={() => handleOperator("yroot")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              <sup>y</sup>√x
            </button>
            <button
              onClick={() => handleScientificOperation("1/x")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              1/x
            </button>

            {/* Row 5 - Scientific */}
            <button
              onClick={() => handleScientificOperation("factorial")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              n!
            </button>
            <button
              onClick={() => handleScientificOperation("exp")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              e<sup>x</sup>
            </button>
            <button
              onClick={() => handleScientificOperation("pi")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              π
            </button>
            <button
              onClick={() => handleScientificOperation("e")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              e
            </button>
            <button
              onClick={() => inputDigit("0.")}
              className="flex h-12 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              0.
            </button>
          </div>
        )}

        {/* Standard Keypad */}
        <div className="grid grid-cols-4 gap-1 bg-gray-100 p-2">
          {/* Row 1 */}
          <button
            onClick={clearDisplay}
            className="flex h-16 items-center justify-center rounded-lg bg-red-500 text-xl font-medium text-white hover:bg-red-600"
          >
            AC
          </button>
          <button
            onClick={handlePlusMinus}
            className="flex h-16 items-center justify-center rounded-lg bg-gray-200 text-xl font-medium hover:bg-gray-300"
          >
            +/-
          </button>
          <button
            onClick={handlePercentage}
            className="flex h-16 items-center justify-center rounded-lg bg-gray-200 text-xl font-medium hover:bg-gray-300"
          >
            <Percent size={20} />
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="flex h-16 items-center justify-center rounded-lg bg-blue-500 text-xl font-medium text-white hover:bg-blue-600"
          >
            <Divide size={20} />
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputDigit("7")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            7
          </button>
          <button
            onClick={() => inputDigit("8")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            8
          </button>
          <button
            onClick={() => inputDigit("9")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            9
          </button>
          <button
            onClick={() => handleOperator("*")}
            className="flex h-16 items-center justify-center rounded-lg bg-blue-500 text-xl font-medium text-white hover:bg-blue-600"
          >
            <X size={20} />
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit("4")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            4
          </button>
          <button
            onClick={() => inputDigit("5")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            5
          </button>
          <button
            onClick={() => inputDigit("6")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            6
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="flex h-16 items-center justify-center rounded-lg bg-blue-500 text-xl font-medium text-white hover:bg-blue-600"
          >
            <Minus size={20} />
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputDigit("1")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            1
          </button>
          <button
            onClick={() => inputDigit("2")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            2
          </button>
          <button
            onClick={() => inputDigit("3")}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            3
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="flex h-16 items-center justify-center rounded-lg bg-blue-500 text-xl font-medium text-white hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputDigit("0")}
            className="col-span-2 flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="flex h-16 items-center justify-center rounded-lg bg-white text-xl font-medium hover:bg-gray-100"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="flex h-16 items-center justify-center rounded-lg bg-blue-600 text-xl font-medium text-white hover:bg-blue-700"
          >
            =
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>OnePlus Nord CE2 Scientific Calculator</p>
        <p className="mt-1">Built with Next.js and Tailwind CSS</p>
      </div>
    </div>
  )
}

