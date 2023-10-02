class Historial {
    constructor() {
        this.historial = [];
    }

    agregarCalculo(expresion, resultado) {
        this.historial.push({ expresion, resultado });
    }

    agregarError(expresion, mensajeError) {
        this.historial.push({ expresion, resultado: `Error: ${mensajeError}` });
    }

    obtenerHistorial() {
        return this.historial;
    }

    actualizarInterfaz() {
        const historialList = document.getElementById('historial-list');
        historialList.innerHTML = '';

        this.historial.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.expresion} = ${item.resultado}`;
            historialList.appendChild(listItem);
        });
    }
}

const historial = new Historial();


let viewValue = '0';

function update() {
    const view = document.getElementById('view');
    view.textContent = viewValue;
}

function appendToView(val, bool = false) {
    if (viewValue === '0') {
        viewValue = val;
    }else if(bool==true && viewValue !== '0' && viewValue[0]!=='-'){
        viewValue = val + viewValue;
    }else if(bool==true && viewValue !== '0' && viewValue[0]==='-'){
        viewValue = viewValue.substring(1)
    }else {
        viewValue += val;
    }
    update();
}

function clearVIew() {
    viewValue = '0';
    update();
}

function calculate() {
    const expresion = viewValue;
    try {
        const resultado = eval(viewValue);
        historial.agregarCalculo(expresion, resultado);
        historial.actualizarInterfaz();
        viewValue = resultado.toString(); // Actualiza el valor en pantalla con el resultado
    } catch (error) {
        historial.agregarError(expresion, error.message);
        historial.actualizarInterfaz();
        viewValue = 'Error';
    }
    update();
}



update();
