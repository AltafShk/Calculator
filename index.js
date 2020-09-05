const container = document.querySelector(".outer-container")
const calculator = container.querySelector(".container")
const buttons = calculator.querySelector(".button-window")



const calculate = (n1, n2, operator) => {
    var result = ''

    // console.log(n1)
    // console.log(n2)
    // console.log(operator)
    
    if (operator === 'plus') {
      result = n1 + n2
    } else if (operator === 'minus') {
      result = n1 - n2
    } else if (operator === 'multiply') {
      result = n1 * n2
    } else if (operator === 'divide') {
      if(n2 === 0){
          alert("Operation not supported - division by 0")
          calculator.dataset.firstNum = ''
        calculator.dataset.modNum = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
        display.textContent = '0'
        calculator.dataset.previousKeyType = 'clear'

      }
      else{
      result = n1 / n2
      }
    }
    
    return result
  }


buttons.addEventListener("click", event => {


 if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;

    if(action === "num"){
        // console.log("number key")
    }

    else if (
        action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        // console.log('operator key!')
      }

      else if (action === 'point') {
        // console.log('decimal key!')
      }
      
      else if (action === 'all-clear') {
        // console.log('clear key!')
      }
      
      else if (action === 'equal') {
        // console.log('equal key!')
      }
 }
})







buttons.addEventListener('click', event => {
    const displayWindow = document.querySelector('.display-window')
    const display = displayWindow.querySelector('#result')
    const previousKeyType = calculator.dataset.previousKeyType

    const numAfterDecimal = calculator.dataset.edgecase

    // console.log(calculator.dataset.firstNum)
    // console.log(calculator.dataset.operator)


  if (event.target.matches('button')) {
    const button = event.target
    const action = button.dataset.action
    const buttonValue = button.textContent
    const displayedValue = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
    
    if (action === "num") {

        if(previousKeyType === "equal"){
            calculator.dataset.firstNum = ''
            calculator.dataset.modNum = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
            display.textContent = buttonValue
            calculator.dataset.previousKeyType = 'clear'
        }

        // console.log(displayedValue)
        else if (displayedValue === '0' || previousKeyType === 'operator' || previousKeyType === 'equal') {

            if(previousKeyType === 'equal'){
                calculator.dataset.edgecase = '1'
            }

            display.textContent = buttonValue
          } else {
            display.textContent = displayedValue + buttonValue
          }


          calculator.dataset.previousKeyType = 'number'

        
      }
      

  

      if (action === 'point') {
          const previousKeyType = calculator.dataset.previousKeyType
          console.log(displayedValue)
          console.log(previousKeyType)


          if (previousKeyType === 'operator' || previousKeyType === 'equal') {
            display.textContent = '0.'
          }
          else if(!displayedValue.includes('.')) {
            
            display.textContent = displayedValue + '.'
          }

          calculator.dataset.previousKeyType = 'decimal'

          
      }

      if (
        action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        
        const previousKeyType = calculator.dataset.previousKeyType
        const firstNum = calculator.dataset.firstNum
        const operator = calculator.dataset.operator
        const secondNum = displayedValue

        

        if (firstNum && operator && previousKeyType !== 'operator' && previousKeyType !== 'equal') {
            
            const calculatedValue = calculate(parseFloat(firstNum), parseFloat(secondNum), operator)

            display.textContent = calculatedValue

            calculator.dataset.firstNum = calculatedValue

          }
          else {
            calculator.dataset.firstNum = displayedValue
          }


        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action


      }

      
      if(action === "all-clear"){
        calculator.dataset.firstNum = ''
        calculator.dataset.modNum = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
        display.textContent = '0'
        calculator.dataset.previousKeyType = 'clear'

      }



      if (action === 'equal') {




        var firstNum = calculator.dataset.firstNum
        const operator = calculator.dataset.operator
        var secondNum = displayedValue
        const previousKeyType = calculator.dataset.previousKeyType
        const numAfterDecimal = calculator.dataset.edgecase
        const modNum = calculator.dataset.modNum
        var temp = 0


        //Newly added
        if(numAfterDecimal === '1'){
            temp = calculate(parseFloat(firstNum), parseFloat(modNum), operator)
            
            firstNum = temp
            
            
            calculator.dataset.edgecase = '0'
            temp = null
        }
        //Till here

        if (firstNum){

            if (previousKeyType === 'equal') {
                firstNum = displayedValue
                secondNum = calculator.dataset.modNum
              }

            


            display.textContent = calculate(parseFloat(firstNum), parseFloat(secondNum), operator)
        }
        


        calculator.dataset.modNum = secondNum
        calculator.dataset.previousKeyType = 'equal'

      }
  }
})