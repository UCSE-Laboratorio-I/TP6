# TP N° 6: Programación Lógica Aplicada en Prolog

**Institución:** Universidad Católica de Santiago del Estero (UCSE) — Departamento Académico San Salvador (DASS)  
**Carrera:** Tecnicatura Universitaria en Automatización y Robótica / Informática  
**Asignatura:** Laboratorio I (Inteligencia Artificial y Agentes Racionales)  
**Ciclo Lectivo:** 2026  
**Docente / JTP:** Ing. Fabio D. Argañaraz  
**Organización Oficial:** [UCSE-Laboratorio-I](https://github.com/UCSE-Laboratorio-I)

---

## 🎯 Objetivos del Trabajo Práctico
- Comprender el paradigma de **Programación Lógica Declarativa** bajo la tesis de Kowalski (*Algoritmo = Lógica + Control*).
- Dominar los **5 elementos canónicos de Prolog**: Hechos, Consultas, Variables, Conjunciones y Reglas.
- Aplicar las **reglas sintácticas de Edimburgo**: átomos y predicados en minúscula (`juan`, `libro`), variables en mayúscula (`X`, `Persona`) o variable anónima (`_`), y terminador de punto obligatorio (`.`).
- Utilizar la consola interactiva `?-` y comprender el significado de las respuestas `Yes` / `No` bajo la **Negación como Falla (NAF)** y el **Supuesto de Mundo Cerrado (CWA)**.
- Dominar la conjunción lógica (coma `,`), el orden secuencial de evaluación de izquierda a derecha y el mecanismo de **Backtracking (vuelta atrás)** mediante el punto y coma `;` o el botón *Next*.
- Programar reglas deductivas mediante **Cláusulas de Horn** (`Cabeza :- Cuerpo.`) y el operador de desigualdad `X \= Y` para exclusión de identidad.
- Resolver e implementar computacionalmente el **Árbol Genealógico Familiar** de la clase (Víctor, Consuelo, Belén, Juan, María, Carlos, Rosario, Soltero, Carlitos, Elena) deduciendo reglas de `progenitor`, `abuelo/abuela`, `padre/madre`, `hermano/hermana`, `tio/tia` y `primo/prima`.
- Experimentar con compiladores en línea: **SWISH (SWI-Prolog for Sharing)** y **OneCompiler**.

---

## 💻 Entornos de Desarrollo para Prolog

Para realizar las pruebas y ejecutar el código del árbol genealógico (`familia.pl`), puedes utilizar cualquiera de estas tres opciones:

1. **[SWISH (SWI-Prolog for Sharing)](https://swish.swi-prolog.org/) [RECOMENDADO DE CÁTEDRA]:**
   - Entorno web oficial de SWI-Prolog.
   - Permite escribir la Base de Conocimiento en el panel izquierdo y realizar consultas interactivas `?-` en el panel inferior derecho, explorando soluciones sucesivas mediante el botón **Next** (Backtracking interactivo).
2. **[OneCompiler Prolog](https://onecompiler.com/prolog):**
   - Entorno online rápido y minimalista.
   - Ejecuta en modo por lotes (*batch*), ideal para scripts directos que utilicen `:- initialization(main).` y `write/nl`.
3. **SWI-Prolog Local (Windows / Linux / macOS):**
   - Descarga gratuita desde [swi-prolog.org](https://www.swi-prolog.org/).
   - Permite cargar el archivo con `['familia.pl'].` y consultar en la terminal local de tu computadora.

---

## 📚 Bibliografía y Referencias Obligatorias
1. **Presentación Oficial de Clase:**
   - `7 - Lógica aplicada en PROLOG.pptx` (Diapositivas de cátedra - Ing. Fabio D. Argañaraz).
2. **Russell, Stuart & Norvig, Peter:** [*Inteligencia Artificial: Un Enfoque Moderno*](http://jdelagarza.fime.uanl.mx/IA/Libros/inteligencia-artificial-un-enfoque-moderno-stuart-j-russell.pdf) (AIMA, 2da / 3ra Edición):
   - **Capítulo 9.5:** Sistemas de Programación Lógica y Prolog (pp. 291-296).
3. **Documentación Oficial de SWI-Prolog:**
   - [SWI-Prolog Reference Manual](https://www.swi-prolog.org/pldoc/doc_for?object=manual).

---

## 🚀 Guía de Resolución y Entrega (Git / GitHub)

Este Trabajo Práctico es 100% interactivo y autoevaluable:

1. **Bifurcación (Fork):** Ingresa al repositorio oficial [UCSE-Laboratorio-I/TP6](https://github.com/UCSE-Laboratorio-I/TP6) y haz clic en **Fork** (o **Use this template**) para crear tu copia personal en GitHub.
2. **Clonación local:** Clona tu repositorio bifurcado:
   ```bash
   git clone https://github.com/TU_USUARIO/TP6.git
   cd TP6
   ```
3. **Resolución Interactiva en el Navegador:** Abre el archivo `index.html` con doble clic en tu navegador. Puedes consultar el código de `familia.pl` integrado, probarlo en SWISH o OneCompiler, y resolver los 10 ejercicios interactivos. Tu progreso se guarda automáticamente en `localStorage`.
4. **Exportar JSON de Respuestas:** Al alcanzar el 100% de progreso, haz clic en **`💾 Exportar JSON`** y guarda el archivo `respuestas_tp6.json` en la raíz del repositorio local.
5. **Autoevaluación Local (Recomendada):** Con Python 3 instalado en tu terminal:
   ```bash
   python autograder_tp6.py respuestas_tp6.json
   ```
   *Deberás obtener `100 / 100 pts [■■■■■■■■■■]`.*
6. **Confirmación y Entrega con Git:**
   ```bash
   git add respuestas_tp6.json
   git commit -m "Entrega final TP6 - [Tu Nombre y Apellido]"
   git push origin main
   ```
7. **Notificación:** Envía la URL de tu repositorio personal de GitHub a través del canal formal de la cátedra para su calificación.
