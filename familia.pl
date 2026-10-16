/* ==========================================================================
   familia.pl - Base de Conocimiento del Árbol Genealógico
   Cátedra: Laboratorio I (IA y Agentes Racionales) - UCSE DASS 2026
   Docente: Ing. Fabio D. Argañaraz
   Basado en: Diapositivas Clase 7 ("Lógica aplicada en PROLOG")
   ========================================================================== */

% Directivas para permitir cláusulas no contiguas en SWI-Prolog / SWISH
:- discontiguous padre/2.
:- discontiguous madre/2.

/* --------------------------------------------------------------------------
   1. DECLARACIÓN DE GÉNEROS (Predicados Monádicos: hombre/1, mujer/1)
   -------------------------------------------------------------------------- */
hombre(victor).
hombre(juan).
hombre(soltero).
hombre(carlos).
hombre(carlitos).

mujer(consuelo).
mujer(maria).
mujer(rosario).
mujer(belen).
mujer(elena).

/* --------------------------------------------------------------------------
   2. HECHOS DE PATERNIDAD Y MATERNIDAD (padre/2, madre/2 agrupados)
   padre(Padre, Hijo/a).
   madre(Madre, Hijo/a).
   -------------------------------------------------------------------------- */

% Todos los hechos de padre/2 juntos (evita advertencia de cláusulas dispersas)
padre(victor, belen).
padre(juan, soltero).
padre(juan, rosario).
padre(juan, carlos).
padre(carlos, carlitos).
padre(carlos, elena).

% Todos los hechos de madre/2 juntos
madre(consuelo, belen).
madre(maria, soltero).
madre(maria, rosario).
madre(maria, carlos).
madre(belen, carlitos).
madre(belen, elena).

/* --------------------------------------------------------------------------
   3. REGLAS DEDUCTIVAS DE PARENTESCO (Cláusulas de Horn)
   -------------------------------------------------------------------------- */

% Progenitor: X es progenitor de Y si es su padre O es su madre.
progenitor(X, Y) :- padre(X, Y).
progenitor(X, Y) :- madre(X, Y).

% Abuelo: X es abuelo de Y si X es padre de Z y Z es progenitor de Y.
abuelo(X, Y) :-
    padre(X, Z),
    progenitor(Z, Y).

% Abuela: X es abuela de Y si X es madre de Z y Z es progenitor de Y.
abuela(X, Y) :-
    madre(X, Z),
    progenitor(Z, Y).

% Predicados unarios: Determinan si alguien es padre o madre en general.
es_padre(X) :- padre(X, _).
es_madre(X) :- madre(X, _).

% Hermano / Hermana: comparten progenitor y no son la misma persona (X \= Y).
hermano(X, Y) :-
    hombre(X),
    progenitor(P, X),
    progenitor(P, Y),
    X \= Y.

hermana(X, Y) :-
    mujer(X),
    progenitor(P, X),
    progenitor(P, Y),
    X \= Y.

% Tío / Tía: X es hermano/a del progenitor de Y.
tio(X, Y) :-
    hermano(X, P),
    progenitor(P, Y).

tia(X, Y) :-
    hermana(X, P),
    progenitor(P, Y).

% Primo / Prima: X es hijo/a del hermano/a del progenitor de Y.
primo(X, Y) :-
    hombre(X),
    progenitor(P1, X),
    progenitor(P2, Y),
    (hermano(P1, P2) ; hermana(P1, P2)),
    X \= Y.

prima(X, Y) :-
    mujer(X),
    progenitor(P1, X),
    progenitor(P2, Y),
    (hermano(P1, P2) ; hermana(P1, P2)),
    X \= Y.

/* --------------------------------------------------------------------------
   4. EJEMPLOS DE CONSULTAS TÍPICAS (Ejecutar en la consola '?-' de SWISH/SWI):
   --------------------------------------------------------------------------
   ?- abuelo(victor, Quien).
   ?- abuelo(juan, Quien).
   ?- hermano(carlos, Hermano).
   ?- tia(rosario, Sobrino).
   ?- es_padre(carlos).
   ?- progenitor(P, elena).
   ========================================================================== */
