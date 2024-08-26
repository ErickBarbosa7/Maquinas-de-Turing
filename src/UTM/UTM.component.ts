import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html'
})
export class UTMComponent {
  // Declaración de las variables que se usarán
  estados: string[] = [];
  alfabeto: string[] = [];
  transiciones: any[] = [];
  estadoInicial: string = '';
  estadosDeAceptacion: string[] = [];
  cadenaDeEntrada: string = '';
  resultado: string = '';

  // Constructor
  constructor() { }

  // Inicializador del componente
  ngOnInit() { }
  selectedOption: string | null = null;

  // Variable para almacenar la opción seleccionada
  selectOption(option: string): void {
    this.selectedOption = option;
    console.log('Opción seleccionada:', option);
  }

  // Método para ejecutar la simulación
  ejecutar() {
    console.log("hola");
    
    // Obtener los datos ingresados
    this.obtenerDatos();
    console.log('Datos:', {
      estados: this.estados,
      alfabeto: this.alfabeto,
      transiciones: this.transiciones,
      estadoInicial: this.estadoInicial,
      estadosDeAceptacion: this.estadosDeAceptacion,
      cadenaDeEntrada: this.cadenaDeEntrada
    });

    if (this.selectedOption === 'opcion1') {
      this.resultado = this.simularMaquinaDeTuringUniversal();
    } else if (this.selectedOption === 'opcion2') {
      this.resultado = this.simularMaquinaDeTuringNoDeterminista();
    } else {
      this.resultado = 'Por favor, selecciona una opción válida.';
    }
  }

  // Método para obtener los datos ingresados
  obtenerDatos() {
    const estadosInput = (document.getElementById('estados') as HTMLInputElement).value;
    const alfabetoInput = (document.getElementById('alfabeto') as HTMLInputElement).value;
    const transicionesInput = (document.getElementById('transiciones') as HTMLInputElement).value;
    const estadoInicialInput = (document.getElementById('estado_inicial') as HTMLInputElement).value;
    const estadosDeAceptacionInput = (document.getElementById('estados_de_aceptacion') as HTMLInputElement).value;
    const cadenaDeEntradaInput = (document.getElementById('cadena_de_entrada') as HTMLInputElement).value;

    this.estados = estadosInput.split(',').map(s => s.trim());
    this.alfabeto = alfabetoInput.split(',').map(s => s.trim());
    this.transiciones = this.parseTransiciones(transicionesInput);
    this.estadoInicial = estadoInicialInput.trim();
    this.estadosDeAceptacion = estadosDeAceptacionInput.split(',').map(s => s.trim());
    this.cadenaDeEntrada = cadenaDeEntradaInput.trim();
  }

  // Método para convertir en un array de objetos
  parseTransiciones(input: string) {
    return input.split(';').map(t => {
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = t.split(',').map(s => s.trim());
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    });
  }

  // Método para simular la Máquina de Turing Universal
  simularMaquinaDeTuringUniversal() {
    let cinta = ['_'].concat(this.cadenaDeEntrada.split(''), ['_']);
    let cabeza = 1;
    let estadoActual = this.estadoInicial;

    // Ejecuta hasta que llegue a un estado de aceptación
    while (!this.estadosDeAceptacion.includes(estadoActual)) {
      const simboloActual = cinta[cabeza] || '_';
      const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);
      if (!transicion) {
        return 'Cadena rechazada (sin transiciones disponibles).';
      }

      // Actualiza el estado de la cinta
      cinta[cabeza] = transicion.simboloEscribir;
      estadoActual = transicion.estadoSiguiente;
      cabeza += transicion.direccion === 'R' ? 1 : -1;

      // Verificar si está dentro de los límites
      if (cabeza < 0 || cabeza >= cinta.length) {
        return 'Cadena rechazada (la cabeza se salió de la cinta).';
      }
    }

    return 'Cadena aceptada.';
  }

  // Método para simular la Máquina de Turing No Determinista
  simularMaquinaDeTuringNoDeterminista() {
    // Configuración inicial
    let cintas: { cinta: string[], cabeza: number, estado: string }[] = [{
        cinta: ['_'].concat(this.cadenaDeEntrada.split(''), ['_']),
        cabeza: 1,
        estado: this.estadoInicial
    }];
    let configuracionesSiguientes: { cinta: string[], cabeza: number, estado: string }[] = [];

    // Ejecuta hasta que se encuentre una configuración de aceptación o se agoten todas las configuraciones
    while (cintas.length > 0) {
        configuracionesSiguientes = [];

        // Procesar todas las configuraciones actuales
        for (let config of cintas) {
            const simboloActual = config.cinta[config.cabeza] || '_';
            const transiciones = this.transiciones.filter(t => t.estado === config.estado && t.simbolo === simboloActual);

            if (transiciones.length === 0) {
                continue;
            }

            // Aplicar todas las transiciones posibles
            for (let transicion of transiciones) {
                let nuevaCinta = [...config.cinta];
                nuevaCinta[config.cabeza] = transicion.simboloEscribir;

                let nuevaCabeza = config.cabeza + (transicion.direccion === 'R' ? 1 : -1);
                if (nuevaCabeza < 0 || nuevaCabeza >= nuevaCinta.length) {
                    continue;
                }

                configuracionesSiguientes.push({
                    cinta: nuevaCinta,
                    cabeza: nuevaCabeza,
                    estado: transicion.estadoSiguiente
                });
            }
        }

        // Verificar si alguna de las configuraciones alcanza un estado de aceptación
        for (let config of configuracionesSiguientes) {
            if (this.estadosDeAceptacion.includes(config.estado)) {
                return 'Cadena aceptada.';
            }
        }

        // Actualizar configuraciones para la siguiente iteración
        cintas = configuracionesSiguientes;
    }

    return 'Cadena rechazada.';
}


  // Método para limpiar los campos
  limpiar() {
    // Limpiar los campos 
    this.estados = [];
    this.alfabeto = [];
    this.transiciones = [];
    this.estadoInicial = '';
    this.estadosDeAceptacion = [];
    this.cadenaDeEntrada = '';
    this.resultado = '';

    (document.getElementById('estados') as HTMLInputElement).value = '';
    (document.getElementById('alfabeto') as HTMLInputElement).value = '';
    (document.getElementById('transiciones') as HTMLInputElement).value = '';
    (document.getElementById('estado_inicial') as HTMLInputElement).value = '';
    (document.getElementById('estados_de_aceptacion') as HTMLInputElement).value = '';
    (document.getElementById('cadena_de_entrada') as HTMLInputElement).value = '';
  }
}
