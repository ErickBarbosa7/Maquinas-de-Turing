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

  constructor() { }

  ngOnInit() { }
  selectedOption: string | null = null;

  selectOption(option: string): void {
    this.selectedOption = option;
    console.log('Opción seleccionada:', option);
  }
  ejecutar() {
    console.log("hola");
    
    this.obtenerDatos();
    console.log('Datos:', {
      estados: this.estados,
      alfabeto: this.alfabeto,
      transiciones: this.transiciones,
      estadoInicial: this.estadoInicial,
      estadosDeAceptacion: this.estadosDeAceptacion,
      cadenaDeEntrada: this.cadenaDeEntrada
    });
    this.resultado = this.simularMaquinaDeTuring();
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
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = t.split(',').map(s => s.trim());
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    });
  }

  simularMaquinaDeTuring() {
    let cinta = ['_'].concat(this.cadenaDeEntrada.split(''), ['_']);
    let cabeza = 1;
    let estadoActual = this.estadoInicial;

    while (!this.estadosDeAceptacion.includes(estadoActual)) {
      const simboloActual = cinta[cabeza] || '_';
      const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);
      if (!transicion) {
        return 'Cadena rechazada (sin transiciones disponibles).';
      }

      cinta[cabeza] = transicion.simboloEscribir;
      estadoActual = transicion.estadoSiguiente;
      cabeza += transicion.direccion === 'R' ? 1 : -1;

      if (cabeza < 0 || cabeza >= cinta.length) {
        return 'Cadena rechazada (la cabeza se salió de la cinta).';
      }
    }

    return 'Cadena aceptada.';
  }
}
