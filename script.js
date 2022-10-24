var num1 = ''
var num2 = ''
var operator = ''
var result = 0


function adicionarNum(number) {
    if (operator === '') {
        num1 = num1 + number
        atualizarTela(num1)
    } else {
        num2 = num2 + number
        if (parseFloat(num2) < 0)
            atualizarTela(num1 + operator + '(' + num2 + ')')
        else
            atualizarTela(num1 + operator + num2)
    }
}

function operacao(operator) {
    if (operator != '' && num2 != '') {
        calculo()
        num1 = result
        num2 = ''
    }
    this.operator = operator
    atualizarTela(num1 + operator)
}

function inverteSinal() {
    if (operator == '') {
        if (parseFloat(num1) >= 0 && num1 != '') {
            num1 = '-' + num1
        } else {
            num1 = num1.slice(1)
        }
        atualizarTela(num1)
    } else {
        if (parseFloat(num2) >= 0 && num2 != '') {
            num2 = '-' + num2
            atualizarTela(num1 + operator + '(' + num2 + ')')
        } else {
            num2 = num2.slice(1)
            atualizarTela(num1 + operator + num2)
        }
    }
}

function igual() {
    calculo()
    if (Number.isInteger(result)) atualizarTela(result)
    else atualizarTela(result.toPrecision(3))
    num1 = ''
    num2 = ''
    operator = ''
}

function atualizarTela(texto) {
    document.getElementById('texto-tela').innerHTML = texto
}

function limparCalculadora() {
    num1 = ''
    num2 = ''
    result = 0
    operator = ''
    atualizarTela("0")
}

function calculo() {
    if (error())
        switch (operator) {
            case '+':
                result = parseFloat(num1) + parseFloat(num2)
                break;
            case '-':
                result = parseFloat(num1) - parseFloat(num2)
                break;
            case '*':
                result = parseFloat(num1) * parseFloat(num2)
                break;
            case '/':
                result = parseFloat(num1) / parseFloat(num2)
                break;
            case '!':
                result = fatorial(parseInt(num1))
                break;
            default:
                result = num1
                break;
        }
}

function fatorial(num) {
    if (num < 2) {
        return 1
    } else {
        return num * fatorial(num - 1)
    }
}

function error() {
    if (operator == '!') {
        if (!Number.isInteger(parseFloat(num1)) || parseFloat(num1) < 0) {
            modalhidden("Fatorial apenas com números naturais! Por favor insira um número natural.")
            return false
        }
        return true
    }

    if (num1 == '' && num2 == '') {
        modalhidden('Campos vazios! Prencha os dois valores')
        return false
    }

    if (operator != '' && num2 == '') {
        modalhidden('Preencha o segundo número para realizar esta operação')
        return false
    }

    if (operator == '/') {
        if (num2 == 0) {
            modalhidden("Operação inválida! Divisão por 0.");
            return false
        }
        return true
    }
    return true
}

function modalhidden(texto_alert) {
    document.getElementById('calculadora_tela').style.animation = "erroTela 0.5s ease 1s 2";
    document.getElementById('calculadora_tela').style.border = "1px solid red";

    document.getElementById('alert-text').innerHTML = texto_alert;
    document.getElementById('modal-error').style.top = "-30px";
    
    var delayInMilliseconds = 3000;

    setTimeout(function () {
        document.getElementById('modal-error').style.top = "-300px";
        document.getElementById('calculadora_tela').style.border = "none";
        document.getElementById('calculadora_tela').style.animation = "none";
    }, delayInMilliseconds);
}