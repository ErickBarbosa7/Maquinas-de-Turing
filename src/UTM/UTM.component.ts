import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html'
})
export class UTMComponent {
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

  constructor() { }

  ngOnInit() { }

  selectOption(option: string): void {
    this.selectedOption = option;
    console.log('Opción seleccionada:', option);

    // Establece visualizacionUniversal basado en la opción seleccionada
    this.visualizacionUniversal = option === 'opcion1';
  }

  ejecutar() {
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
      const { resultado, caminos } = this.simularMaquinaDeTuringNoDeterminista();
      this.resultado = resultado;
      this.caminos = caminos; // Almacena los caminos en el array
    } else {
      this.resultado = 'Por favor, selecciona una opción válida.';
      this.caminos = []; // Limpia los caminos
    }
  }

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

  parseTransiciones(input: string) {
    return input.split(';').map(t => {
      const partes = t.split(',').map(s => s.trim());
      if (partes.length !== 5) {
        console.error('Transición mal formada:', t);
        return null;
      }
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = partes;
      if (!['L', 'R'].includes(direccion.toUpperCase())) {
        console.error('Dirección no válida:', direccion);
        return null;
      }
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    }).filter(t => t !== null);
  }

  simularMaquinaDeTuringUniversal() {
    let cinta = ['_'].concat(this.cadenaDeEntrada.split(''), ['_']);
    let cabeza = 1;
    let estadoActual = this.estadoInicial;

    while (!this.estadosDeAceptacion.includes(estadoActual)) {
      const simboloActual = cinta[cabeza] || '_';
      const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);
      if (!transicion) {
        return 'Cadena rechazada sin transiciones disponibles.';
      }
      cinta[cabeza] = transicion.simboloEscribir;
      estadoActual = transicion.estadoSiguiente;
      cabeza += transicion.direccion === 'R' ? 1 : -1;
      if (cabeza < 0 || cabeza >= cinta.length) {
        return 'Cadena rechazada';
      }
    }

    return 'Cadena aceptada.';
  }

  simularMaquinaDeTuringNoDeterminista() {
    let cintas: { cinta: string[], cabeza: number, estado: string }[] = [{
        cinta: ['_'].concat(this.cadenaDeEntrada.split(''), ['_']),
        cabeza: 1,
        estado: this.estadoInicial
    }];
    let configuracionesSiguientes: { cinta: string[], cabeza: number, estado: string }[] = [];
    let caminos: any[] = [];

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
          caminos.push(nuevaConfiguracion); // Añadir cada nueva configuración a los caminos
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
  }

  limpiar() {
    this.estados = [];
    this.alfabeto = [];
    this.transiciones = [];
    this.estadoInicial = '';
    this.estadosDeAceptacion = [];
    this.cadenaDeEntrada = '';
    this.resultado = '';
    this.caminos = [];
    this.visualizacionUniversal = false;

    (document.getElementById('estados') as HTMLInputElement).value = '';
    (document.getElementById('alfabeto') as HTMLInputElement).value = '';
    (document.getElementById('transiciones') as HTMLInputElement).value = '';
    (document.getElementById('estado_inicial') as HTMLInputElement).value = '';
    (document.getElementById('estados_de_aceptacion') as HTMLInputElement).value = '';
    (document.getElementById('cadena_de_entrada') as HTMLInputElement).value = '';
  }
}
