
import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html'
})
export class UTMComponent {
  // Declaración de variables para almacenar los elementos de la maquina de turing
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

  // Metodo para inicializar el componente
  ngOnInit() { }

  // Metodo para manejar las opciones
  selectOption(option: string): void {
    this.selectedOption = option; 
    console.log('Opción seleccionada:', option); // Muestra la opcion seleccionada en la consola

    this.visualizacionUniversal = option === 'opcion1'; 
  }

  //Metodo para ejecutar la simulacion
  ejecutar() {
    // Obtiene los datos de entrada del formulario
    this.obtenerDatos(); 
     // Muestra los datos obtenidos en la consola
    console.log('Datos:', {
      estados: this.estados,
      alfabeto: this.alfabeto,
      transiciones: this.transiciones,
      estadoInicial: this.estadoInicial,
      estadosDeAceptacion: this.estadosDeAceptacion,
      cadenaDeEntrada: this.cadenaDeEntrada
    });

    // Verifica que opción fue seleccionada y ejecuta la simulacion correspondiente
    if (this.selectedOption === 'opcion1') {
      this.resultado = this.simularMaquinaDeTuringUniversal(); // Ejecuta la simulacion para una máquina de Turing universal
    } else if (this.selectedOption === 'opcion2') {
      const { resultado, caminos } = this.simularMaquinaDeTuringNoDeterminista(); // Ejecuta la simulacion para una maquina de Turing no determinista
      this.resultado = resultado;
      this.caminos = caminos; 
    } else {
      this.resultado = 'Selecciona una opcion valida'; 
      this.caminos = [];
    }
  }

  // Metodo para obtener los datos de entrada desde el formulario 
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

  // Metodo para convertir las transiciones desde un string a un array 
  parseTransiciones(input: string) {
    return input.split(';').map(t => {
      const partes = t.split(',').map(s => s.trim());
      if (partes.length !== 5) {
         // Muestra un error si la transicion no tiene 5 partes
        console.error('Transicion mal formada:', t);
        return null;
      }
      // Desestructura las partes de la transición
      const [estado, simbolo, estadoSiguiente, simboloEscribir, direccion] = partes; 
      if (!['L', 'R'].includes(direccion.toUpperCase())) {
        // Muestra un error si la direccion no es valida
        console.error('Direccion no válida:', direccion); 
        return null;
      }
       // Devuelve un objeto con los datos de la transicion
      return { estado, simbolo, estadoSiguiente, simboloEscribir, direccion: direccion.toUpperCase() };
    }).filter(t => t !== null);
  }

  // Metodo Maquina de Turing Universal
  simularMaquinaDeTuringUniversal() {
    if (this.estados.length === 0 || this.alfabeto.length === 0 || this.transiciones.length === 0) {
      return 'No se puede simular, ingresa todos los datos';
    }

  // Crea la cinta con la cadena de entrada rodeada por espacios en blanco
    let cinta = [''].concat(this.cadenaDeEntrada.split(''), ['']); 
    let cabeza = 1; 
    let estadoActual = this.estadoInicial; 
    let caminos: any[] = [];
  
    // Bucle principal para procesar la cadena
    while (!this.estadosDeAceptacion.includes(estadoActual)) {
      const simboloActual = cinta[cabeza] || '_'; 
      const transicion = this.transiciones.find(t => t.estado === estadoActual && t.simbolo === simboloActual);
      if (!transicion) {
        return 'Cadena rechazada sin transiciones disponibles.';
      }
  
      // Registrar el estado actual
      caminos.push({
         // Guarda el estado actual de la cinta
        cinta: [...cinta],
         // Guarda la posición de la cabeza
        cabeza: cabeza,
        // Guarda el estado actual
        estado: estadoActual 
      });
  // Escribe el símbolo en la posición de la cabeza
      cinta[cabeza] = transicion.simboloEscribir; 
       // Cambia al estado siguiente
      estadoActual = transicion.estadoSiguiente;
      // Mueve la cabeza a la derecha o izquierda según la dirección
      cabeza += transicion.direccion === 'R' ? 1 : -1; 
  
      // rechaza la cadena si se sale de los limites
      if (cabeza < 0 || cabeza >= cinta.length) {
        return 'Cadena rechazada'; 
      }
    }
  
    // Registrar el estado final
    caminos.push({
      cinta: [...cinta], 
      cabeza: cabeza,
      estado: estadoActual
    });
  
    this.caminos = caminos; 
    return 'Cadena aceptada.';
  }
  

  // Método Maquina de Turing NO Determinista
  simularMaquinaDeTuringNoDeterminista() {
    
    let cintas: { cinta: string[], cabeza: number, estado: string }[] = [{
      // Crea la cinta
        cinta: [''].concat(this.cadenaDeEntrada.split(''), ['']), 
        // Establece la posicion inicial de la cabeza
        cabeza: 1, 
        // Establece el estado inicial
        estado: this.estadoInicial 
    }];
     // Lista para almacenar las configuraciones siguientes
    let configuracionesSiguientes: { cinta: string[], cabeza: number, estado: string }[] = [];
     // Lista para almacenar el camino recorrido
    let caminos: any[] = [];

    // Bucle para procesar cada configuracion
    while (cintas.length > 0) {
      configuracionesSiguientes = []; 
      // Procesa cada configuracion actual
      for (let config of cintas) {
         // Obtiene el símbolo en la posición actual de la cabeza
        const simboloActual = config.cinta[config.cabeza] || '_';
         // Encuentra todas las transiciones posibles
        const transiciones = this.transiciones.filter(t => t.estado === config.estado && t.simbolo === simboloActual);

        if (transiciones.length === 0) {
          continue;
        }

        // Itera sobre cada transicion posible
        for (let transicion of transiciones) {
          // Copia la cinta actual.
          let nuevaCinta = [...config.cinta]; 
          // Escribe el simbolo en la posición de la cabeza
          nuevaCinta[config.cabeza] = transicion.simboloEscribir; 

          // Calcula la nueva posicion de la cabeza
          let nuevaCabeza = config.cabeza + (transicion.direccion === 'R' ? 1 : -1); 
          if (nuevaCabeza < 0 || nuevaCabeza >= nuevaCinta.length) {
            continue; 
          }

          // Crea una nueva configuracion basada en la transicion
          const nuevaConfiguracion = {
            cinta: nuevaCinta,
            cabeza: nuevaCabeza,
            estado: transicion.estadoSiguiente
          };
          // Agrega la nueva configuración a la lista 
          configuracionesSiguientes.push(nuevaConfiguracion);
           // Almacena el camino recorrido para visualizacion
          caminos.push(nuevaConfiguracion);
        }
      }

      // Verifica si alguna de las configuraciones alcanzo un estado de aceptacion
      for (let config of configuracionesSiguientes) {
        if (this.estadosDeAceptacion.includes(config.estado)) {
          return { resultado: 'Cadena aceptada.', caminos };
        }
      }
      // Actualiza las configuraciones actuales 
      cintas = configuracionesSiguientes;
    }

    return { resultado: 'Cadena rechazada.', caminos };
  }

  // Metodo LIMPIAR
  limpiar() {
    // Restablece todas las variables a su estado inicial
    this.estados = [];
    this.alfabeto = [];
    this.transiciones = [];
    this.estadoInicial = '';
    this.estadosDeAceptacion = [];
    this.cadenaDeEntrada = '';
    this.resultado = '';
    this.caminos = [];
    this.visualizacionUniversal = false;

    // Limpia los campos en el HTML
    (document.getElementById('estados') as HTMLInputElement).value = '';
    (document.getElementById('alfabeto') as HTMLInputElement).value = '';
    (document.getElementById('transiciones') as HTMLInputElement).value = '';
    (document.getElementById('estado_inicial') as HTMLInputElement).value = '';
    (document.getElementById('estados_de_aceptacion') as HTMLInputElement).value = '';
    (document.getElementById('cadena_de_entrada') as HTMLInputElement).value = '';
  }
}

