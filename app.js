class Calculator {
  constructor() {
    this.currentOperandText = document.getElementById('current')
    this.prevOperandText = document.getElementById('previous')
    this.clear()
  }

  clear() {
    this.current = ''
    this.previous = ''
    this.operation = undefined
    this.updateDisplay()
  }

  appendInput(input) {
    this.current += input.toString()
    this.updateDisplay()
  }

  compute() {
    const cur = parseFloat(this.current)
    const prev = parseFloat(this.previous)
    let computation
    if (isNaN(prev) || isNaN(cur)) return
    switch (this.operation) {
      case '+':
        computation = prev + cur
        break
      case '-':
        computation = prev - cur
        break
      case '*':
        computation = prev * cur
        break
      case '/':
        computation = prev / cur
        break
    }
    this.current = computation
    this.previous = ''
    this.operation = undefined
    this.updateDisplay()
  }

  appendOperation(input) {
    if (this.current === '') return
    if (this.previous !== '') {
      this.compute()
    }
    this.previous = this.current
    this.current = ''
    this.operation = input
    this.updateDisplay()
  }

  updateDisplay() {
    this.currentOperandText.innerHTML = this.current
    if (this.operation) {
      this.prevOperandText.innerHTML = `${this.previous} ${this.operation}`
    } else {
      this.prevOperandText.innerHTML = this.previous
    }
  }

  removeNumber() {
    this.current = this.current.slice(0, this.current.length - 1)
    this.updateDisplay()
  }
}

const calculator = new Calculator()
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const total = document.querySelector('.total')
const DF = document.querySelector('.delete-full')
const DP = document.querySelector('.delete-part')

numbers.forEach((num) => {
  num.addEventListener('click', () => {
    calculator.appendInput(event.target.innerText)
  })
})

operations.forEach((num) => {
  num.addEventListener('click', () => {
    calculator.appendOperation(event.target.innerText)
  })
})

total.addEventListener('click', () => {
  calculator.compute()
})

DF.addEventListener('click', () => {
  calculator.clear()
})

DP.addEventListener('click', () => {
  calculator.removeNumber()
})
