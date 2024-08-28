# Simulador de Máquinas de Turing

## ¿Qué son las Máquinas de Turing?

Una Máquina de Turing es un modelo matemático de computación que define una máquina hipotética que manipula símbolos en una cinta de acuerdo con un conjunto de reglas. Es un modelo fundamental para la teoría de la computabilidad y se utiliza para entender qué problemas pueden ser resueltos por una computadora.

Hay diferentes tipos de Máquinas de Turing, pero este proyecto se enfoca en dos:

1. **Máquina de Turing Universal**: Un tipo de Máquina de Turing que puede simular cualquier otra Máquina de Turing.
2. **Máquina de Turing No Determinista**: Una Máquina de Turing en la cual, dado un estado y un símbolo de entrada, puede haber múltiples posibles transiciones.

## Propósito del Proyecto

El objetivo de este proyecto es simular el comportamiento de dos tipos de Máquinas de Turing: la Máquina de Turing Universal y la Máquina de Turing No Determinista. Los usuarios pueden ingresar los estados, el alfabeto, la función de transición, el estado inicial, los estados de aceptación, y la cadena de entrada para observar cómo se comporta la máquina.

## Herramientas Utilizadas

- **Angular**: Framework utilizado para desarrollar la aplicación web.
- **TypeScript**: Lenguaje de programación usado en el desarrollo del frontend.
- **Bootstrap**: Framework de CSS para el diseño responsivo y estético.

## Características

- **Simulación de Máquina de Turing Universal**: Permite simular el comportamiento de una Máquina de Turing que puede ejecutar cualquier algoritmo.
- **Simulación de Máquina de Turing No Determinista**: Permite ver múltiples posibles caminos de ejecución dados diferentes estados y transiciones.
- **Visualización del Proceso**: Muestra el estado de la cinta, la posición de la cabeza lectora y el estado actual de la máquina durante la simulación.

## Cómo Ingresar los Datos

1. **Estados**: Ingrese los estados separados por comas, por ejemplo: `q0,q1`.
2. **Alfabeto**: Ingrese los símbolos del alfabeto separados por comas, por ejemplo: `0,1`.
3. **Función de Transición**: Ingrese las transiciones en el formato `estado,símbolo,estado_siguiente,símbolo_escribir,dirección;`, por ejemplo: `q0,0,q1,1,R;q1,1,q0,0,L`.
4. **Estado Inicial**: Ingrese el estado inicial, por ejemplo: `q0`.
5. **Estados de Aceptación**: Ingrese los estados de aceptación separados por comas, por ejemplo: `q0`.
6. **Cadena de Entrada**: Ingrese la cadena de entrada que será procesada por la máquina, por ejemplo: `01`.

## Instrucciones de Instalación

1. **Clona el repositorio**: 
   git clone https://github.com/ErickBarbosa7/Maquinas-de-Turing.git
2. **Navega al directorio del proyecto**:
   cd nombre del proyecto
3. Instala las dependencias
   npm install
4. Inicia la aplicación
   ng serve
5. **Accede a la aplicación**: Abre tu navegador y visita `http://localhost:4200/`.

## Cómo Usar el Simulador

1. Abre la aplicación en tu navegador.
2. Selecciona una opción en el menú desplegable para simular una **Máquina de Turing Universal** o una **Máquina de Turing No Determinista**.
3. Llena los campos requeridos con los estados, alfabeto, función de transición, estado inicial, estados de aceptación, y la cadena de entrada.
4. Haz clic en **Simular** para ejecutar la máquina.
5. Observa la visualización del proceso y el resultado de la simulación.

---
# ProjectTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
