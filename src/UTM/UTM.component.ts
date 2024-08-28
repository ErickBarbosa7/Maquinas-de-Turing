import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html'
})
export class UTMComponent {
  // Variables para almacenar elementos de la máquina de Turing

  estados: string[] = [];
  alfabeto: string[] = [];
  transiciones: any[] = [];
  estadoInicial: string = '';
  estadosDeAceptacion: string[] = [];
  cadenaDeEntrada: string = '';
  resultado: string = '';
  caminos: any[] = [];
  selectedOption: string | null = null;
  visualizacionUniversal: boolean = false;

  // Constructor
  constructor() { }

  ngOnInit() { }
  
  // Método para seleccionar la opción
  selectOption(option: string): void {
    this.selectedOption = option;
    this.visualizacionUniversal = option === 'opcion1';
  }

  // Método para ejecutar la simulación
  ejecutar() {
    this.obtenerDatos();
    try {
      if (this.selectedOption === 'opcion1') {
        this.resultado = this.simularMaquinaDeTuringUniversal();
      } else if (this.selectedOption === 'opcion2') {
        const { resultado, caminos } = this.simularMaquinaDeTuringNoDeterminista();
        this.resultado = resultado;
        this.caminos = caminos;
      } else {
        this.resultado = 'Selecciona una opción válida';
        this.caminos = [];
      }
    } catch (error) {
      console.error('Error durante la simulación', error);
      this.resultado = 'Ocurrió un error durante la simulación. Verifica los datos de entrada.';
    }
  }

  // Método para obtener datos de los campos de entrada
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

  // Método para analizar transiciones
  parseTransiciones(input: string) {
    return input.split(';').map(t => {
      const partes = t.split(',').map(s => s.trim());
      if (partes.length !== 5) {
        console.error('Transición mal formada', t);
        return null;
      }
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = partes;
      if (!['L', 'R'].includes(direccion.toUpperCase())) {
        console.error('Dirección no válida', direccion);
        return null;
      }
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    }).filter(t => t !== null);
  }

  // Método para simular la máquina de Turing Universal
  simularMaquinaDeTuringUniversal() {
    try {
      // Verificar que todos los datos estén presentes
      if (this.estados.length === 0 || this.alfabeto.length === 0 || this.transiciones.length === 0) {
        return 'No se puede simular, ingresa todos los datos';
      }

      // Validar que los símbolos en la cadena de entrada estén en el alfabeto
      const simbolosInvalidos = [];
      for (const simbolo of this.cadenaDeEntrada) {
        if (!this.alfabeto.includes(simbolo)) {
          simbolosInvalidos.push(simbolo);
        }
      }

      // Mostrar símbolos inválidos en un mensaje
      if (simbolosInvalidos.length > 0) {
        return `Cadena rechazada, no están en el alfabeto: ${simbolosInvalidos.join(', ')}.`;
      }

      // Inicializar la cinta, la cabeza y el estado
      let cinta = [''].concat(this.cadenaDeEntrada.split(''), ['']);
      let cabeza = 1;
      let estadoActual = this.estadoInicial;
      let caminos: any[] = [];

      // Simular la máquina
      while (!this.estadosDeAceptacion.includes(estadoActual)) {
        const simboloActual = cinta[cabeza] || '_';
        const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);

        // Verificar transición disponible
        if (!transicion) {
          return 'Cadena rechazada sin transiciones disponibles';
        }

        // Registrar el camino actual
        caminos.push({
          cinta: [...cinta],
          cabeza: cabeza,
          estado: estadoActual
        });

        // Actualizar la cinta, el estado y mover la cabeza
        cinta[cabeza] = transicion.simboloEscribir;
        estadoActual = transicion.estadoSiguiente;
        cabeza += transicion.direccion === 'R' ? 1 : -1;

        // Verificar si la cabeza ha salido de los límites de la cinta
        if (cabeza < 0 || cabeza >= cinta.length) {
          return 'Cadena rechazada: la cabeza se salió de los límites de la cinta.';
        }
      }

      // Registrar el camino final y retornar el resultado
      caminos.push({
        cinta: [...cinta],
        cabeza: cabeza,
        estado: estadoActual
      });

      this.caminos = caminos;
      return 'Cadena aceptada.';
    } catch (error) {
      console.error('Error en la simulación', error);
      return 'Ocurrió un error en la simulación';
    }
  }

  // Método para simular la máquina de Turing No Determinista
  simularMaquinaDeTuringNoDeterminista() {
    try {
      // Validar que los símbolos en la cadena de entrada estén en el alfabeto
      const simbolosInvalidos = [];
      for (let char of this.cadenaDeEntrada) {
        if (!this.alfabeto.includes(char)) {
          simbolosInvalidos.push(char);
        }
      }

      // Mostrar símbolos inválidos en un mensaje
      if (simbolosInvalidos.length > 0) {
        return { 
          resultado: `Cadena rechazada, no están en el alfabeto: ${simbolosInvalidos.join(', ')}`, 
          caminos: [] 
        };
      }

      // Inicializar las configuraciones de la máquina
      let cintas: { cinta: string[], cabeza: number, estado: string }[] = [{
        cinta: [''].concat(this.cadenaDeEntrada.split(''), ['']),
        cabeza: 1,
        estado: this.estadoInicial
      }];
      let configuracionesSiguientes: { cinta: string[], cabeza: number, estado: string }[] = [];
      let caminos: any[] = [];

      // Simular la máquina de Turing no determinista
      while (cintas.length > 0) {
        configuracionesSiguientes = [];
        for (let config of cintas) {
          const simboloActual = config.cinta[config.cabeza] || '_';
          const transiciones = this.transiciones.filter(t => t.estado === config.estado && t.simbolo === simboloActual);

          if (transiciones.length === 0) {
            continue;
          }

          for (let transicion of transiciones) {
            let nuevaCinta = [...config.cinta];
            nuevaCinta[config.cabeza] = transicion.simboloEscribir;

            let nuevaCabeza = config.cabeza + (transicion.direccion === 'R' ? 1 : -1);
            if (nuevaCabeza < 0 || nuevaCabeza >= nuevaCinta.length) {
              continue;
            }

            const nuevaConfiguracion = {
              cinta: nuevaCinta,
              cabeza: nuevaCabeza,
              estado: transicion.estadoSiguiente
            };
            configuracionesSiguientes.push(nuevaConfiguracion);
            caminos.push(nuevaConfiguracion);
          }
        }

        for (let config of configuracionesSiguientes) {
          if (this.estadosDeAceptacion.includes(config.estado)) {
            return { resultado: 'Cadena aceptada.', caminos };
          }
        }
        cintas = configuracionesSiguientes;
      }

      return { resultado: 'Cadena rechazada.', caminos };
    } catch (error) {
      console.error('Error en la simulación de la Máquina de Turing No Determinista', error);
      return {
         resultado: 'Ocurrió un error en la simulación.', 
         caminos: [] 
      };
    }
  }

  // Método para limpiar los datos
  limpiar() {
    this.estados = [];
    this.alfabeto = [];
    this.transiciones = [];
    this.estadoInicial = '';
    this.estadosDeAceptacion = [];
    this.cadenaDeEntrada = '';
    this.resultado = '';
    this.caminos = [];
    this.selectedOption = null;
    this.visualizacionUniversal = false;
    (document.getElementById('estados') as HTMLInputElement).value = '';
    (document.getElementById('alfabeto') as HTMLInputElement).value = '';
    (document.getElementById('transiciones') as HTMLInputElement).value = '';
    (document.getElementById('estado_inicial') as HTMLInputElement).value = '';
    (document.getElementById('estados_de_aceptacion') as HTMLInputElement).value = '';
    (document.getElementById('cadena_de_entrada') as HTMLInputElement).value = '';
  }
}

    
  