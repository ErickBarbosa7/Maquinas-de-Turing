import { Component } from '@angular/core';

@Component({
  selector: 'app-utm',
  templateUrl: './UTM.component.html',
  styleUrls: ['./UTM.component.css']
})
export class UTMComponent {
  estados: string[] = [];
  alfabeto: string[] = [];
  transiciones: { [key: string]: any } = {};
  estadoInicial: string = '';
  estadosAceptacion: string[] = [];
  cadenaEntrada: string = '';
  cinta: string[] = [];
  posicionCabezal: number = 0;
  estadoActual: string = '';
  resultado: string = '';

  constructor() {}

  inicializar() {
    this.cinta = this.cadenaEntrada.split('');
    this.posicionCabezal = 0;
    this.estadoActual = this.estadoInicial;
  }

  ejecutar() {
    this.inicializar();
    let ramas: any[] = [{ estado: this.estadoActual, posicion: this.posicionCabezal, cinta: [...this.cinta] }];
    
    while (ramas.length > 0) {
      const nuevaRama = ramas.pop();
      const simboloActual = nuevaRama.cinta[nuevaRama.posicion] || '_';
      const transicionesPosibles = this.transiciones[nuevaRama.estado] || [];

      for (const transicion of transicionesPosibles) {
        if (transicion.simbolo === simboloActual) {
          const nuevaCinta = [...nuevaRama.cinta];
          nuevaCinta[nuevaRama.posicion] = transicion.nuevoSimbolo;

          const nuevaPosicion = transicion.direccion === 'R' ? nuevaRama.posicion + 1 : nuevaRama.posicion - 1;
          const nuevoEstado = transicion.nuevoEstado;

          if (this.estadosAceptacion.includes(nuevoEstado)) {
            this.resultado = 'Aceptado';
            return;
          }

          ramas.push({
            estado: nuevoEstado,
            posicion: nuevaPosicion,
            cinta: nuevaCinta
          });
        }
      }
    }

    this.resultado = 'NO Aceptado';
  }

  limpiar() {
    this.estados = [];
    this.alfabeto = [];
    this.transiciones = {};
    this.estadoInicial = '';
    this.estadosAceptacion = [];
    this.cadenaEntrada = '';
    this.cinta = [];
    this.posicionCabezal = 0;
    this.estadoActual = '';
    this.resultado = '';
  }
}
