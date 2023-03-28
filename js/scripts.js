class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }

    // Iniciar a validação de todos os campos
    validate(form) {

        // Limpa todas as validações antigas
        let currentValidations = document.querySelectorAll(`form .error-validation`);

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // Pegar os inputs
        let inputs = form.getElementsByTagName('input');

        // Transformo um HTMLCollection --> array
        let inputsArray = [...inputs];

        // Loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            // Loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {

                    // Limpando a string para virar um método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // Valor do input
                    let value = input.getAttribute(this.validations[i])

                    // Invocar o método
                    this[method](input,value);
                }
            }
        }, this);

    }
    // Verifica se um input tem um número minimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `Este campo é obrigatório`;
        
        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // Método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {
  
        let inputLength = input.value.length;
        
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        
        if(inputLength > maxValue) {
              this.printMessage(input, errorMessage);
        }
        
    }

    // Método para validar strings que só contem letras
    onlyletters(input) {
  
        let re = /^[A-Za-z]+$/;;
    
        let inputValue = input.value;
    
        let errorMessage = `Este campo não aceita números nem caracteres especiais`;
    
        if(!re.test(inputValue)) {
          this.printMessage(input, errorMessage);
        }
    
      }
    
      // Método para validar e-mail
      emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
    
        let email = input.value;
    
        let errorMessage = `Insira um e-mail no padrão luciana@email.com`;
    
        if(!re.test(email)) {
          this.printMessage(input, errorMessage);
        }
    
      }
    
          
        // Método para exibir inputs que são necessários
        required(input) {
        
        let inputValue = input.value;
        
        if(inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;
        
            this.printMessage(input, errorMessage);
        }
        
    }

    // Validando o campo de senha
    passwordvalidate(input) {
  
        // Explodir string em array
        let charArr = input.value.split("");
    
        let uppercases = 0;
        let numbers = 0;
    
        for(let i = 0; charArr.length > i; i++) {
          if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
            uppercases++;
          } else if(!isNaN(parseInt(charArr[i]))) {
            numbers++;
          }
        }
    
        if(uppercases === 0 || numbers === 0) {
          let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
    
          this.printMessage(input, errorMessage);
        }
    
      }


    // Método para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        // Checa os errors presentes no input
        let errorsQty = input.parentNode.querySelector('.error-validation');

        // Imprimir erro só se não tiver erros
        if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        
        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }

}

    // Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("login-form"); 
let submit = document.getElementById("btn-submit"); 

let validator = new Validator();

// Evento que dispara as validações
submit.addEventListener('click', function(e) {
    e.preventDefault();
    validator.validate(form);
});