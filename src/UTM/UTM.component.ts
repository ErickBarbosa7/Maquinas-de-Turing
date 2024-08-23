import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html'
})
export class UTMComponent {
  //Declaracion de las variables que se usaran
  estados: string[] = [];
  alfabeto: string[] = [];
  transiciones: any[] = [];
  estadoInicial: string = '';
  estadosDeAceptacion: string[] = [];
  cadenaDeEntrada: string = '';
  resultado: string = '';

  //constructor
  constructor() { }

  //inicializador del componente
  ngOnInit() { }
  selectedOption: string | null = null;

  //variable para almacenar la opcion seleccionada
  selectOption(option: string): void {
    this.selectedOption = option;
    console.log('Opción seleccionada:', option);
  }
  ejecutar() {
    console.log("hola");
    
    //obtener los datos ingresados
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

  //metodo para obtener los datos ingresados
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

  //metodo para convertir en un array de objetos
  parseTransiciones(input: string) {
    return input.split(';').map(t => {
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = t.split(',').map(s => s.trim());
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    });
  }

  //metodo para simular la maquina de turing
  simularMaquinaDeTuring() {
    let cinta = ['_'].concat(this.cadenaDeEntrada.split(''), ['_']);
    let cabeza = 1;
    let estadoActual = this.estadoInicial;

    //ejecuta hasta que llegue a un estado de aceptacion
    while (!this.estadosDeAceptacion.includes(estadoActual)) {
      const simboloActual = cinta[cabeza] || '_';
      const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);
      if (!transicion) {
        return 'Cadena rechazada (sin transiciones disponibles).';
      }

      //actualiza el estado de la cinta
      cinta[cabeza] = transicion.simboloEscribir;
      estadoActual = transicion.estadoSiguiente;
      cabeza += transicion.direccion === 'R' ? 1 : -1;

      //verificar si esta dentro de los limites
      if (cabeza < 0 || cabeza >= cinta.length) {
        return 'Cadena rechazada (la cabeza se salió de la cinta).';
      }
    }

    return 'Cadena aceptada.';
  }

  //metodo para limpiar los campos
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
