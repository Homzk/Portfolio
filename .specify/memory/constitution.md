<!--
SYNC IMPACT REPORT
==================
Version change: (template / unversioned) → 1.0.0
Rationale: Primera ratificación. Se materializa la plantilla con 5 principios
concretos para el portafolio personal de Álvaro Flores Rocha (MINOR/MAJOR no
aplican en la adopción inicial; se parte de 1.0.0).

Modified principles:
  - [PRINCIPLE_1_NAME] → I. Fidelidad al Diseño (NO NEGOCIABLE)
  - [PRINCIPLE_2_NAME] → II. Rendimiento como Feature
  - [PRINCIPLE_3_NAME] → III. Bilingüe ES/EN con Paridad Total
  - [PRINCIPLE_4_NAME] → IV. Documentar Decisiones Técnicas
  - [PRINCIPLE_5_NAME] → V. Accesibilidad

Added sections:
  - Restricciones Técnicas y Estándares de Calidad (SECTION_2)
  - Flujo de Desarrollo y Puertas de Calidad (SECTION_3)
  - Governance

Removed sections: none

Templates requiring updates:
  - .specify/templates/plan-template.md ✅ alineado (Constitution Check es genérico,
    deriva sus gates de este archivo; sin cambios necesarios)
  - .specify/templates/spec-template.md ✅ alineado (sin nombres de agente; sin cambios)
  - .specify/templates/tasks-template.md ✅ alineado (categorías de tareas compatibles
    con los principios; sin cambios)

Follow-up TODOs: ninguno. RATIFICATION_DATE establecida como la fecha de adopción inicial.
-->

# Constitución del Portafolio de Álvaro Flores Rocha

Este documento gobierna el desarrollo del portafolio personal de Álvaro Flores Rocha.
El portafolio es, en sí mismo, la tesis profesional de su autor: cada decisión debe ser
defendible. Los principios siguientes son vinculantes para todo trabajo en el repositorio.

## Core Principles

### I. Fidelidad al Diseño (NO NEGOCIABLE)

El diseño ya está aprobado y vive en el skill `alvaro-portfolio`. Las fuentes de verdad son,
en este orden: `assets/App.reference.jsx`, `assets/CaseStudy.reference.jsx` y
`references/design-system.md`.

Reglas:
- El trabajo MUST replicar la referencia de forma exacta cuando exista ambigüedad.
- NO se altera la paleta, la tipografía, el sistema de orbe/grano/flechas, la estructura
  de secciones ni el contenido sin aprobación explícita y previa del autor.
- Cualquier desviación propuesta MUST documentarse y aprobarse antes de implementarse;
  una desviación no aprobada es un defecto, no una mejora.

**Rationale**: El diseño es el producto. Reinventarlo o "mejorarlo" sin permiso destruye la
intención del autor y la coherencia del portafolio. Ante la duda, se replica, no se innova.

### II. Rendimiento como Feature

El rendimiento es un requisito funcional, no un lujo posterior.

Reglas:
- La carga MUST ser rápida; el video MUST usar `webm` en lugar de GIF.
- Toda animación de movimiento MUST realizarse únicamente con `transform` (y `opacity`),
  evitando propiedades que disparen layout/reflow.
- El sitio MUST respetar `prefers-reduced-motion` y degradar el movimiento con elegancia.
- El objetivo es una puntuación Lighthouse alta; las regresiones de rendimiento se tratan
  como defectos.

**Rationale**: Un portafolio de desarrollo que carga lento o se siente pesado contradice su
propio mensaje. La fluidez es parte de la demostración de competencia técnica.

### III. Bilingüe ES/EN con Paridad Total

El sitio es bilingüe español/inglés con paridad absoluta de contenido.

Reglas:
- Todo texto visible MUST existir en español e inglés con el mismo significado y alcance.
- El español es el idioma por defecto.
- Un único toggle MUST controlar el idioma de todo el sitio de forma consistente.
- No se permite contenido que exista en un solo idioma; la falta de paridad es un defecto.

**Rationale**: La audiencia es internacional. La paridad total evita una experiencia de
segunda clase en cualquiera de los dos idiomas y mantiene una sola fuente de intención.

### IV. Documentar Decisiones Técnicas

Cada decisión técnica relevante MUST registrar su porqué.

Reglas:
- Las decisiones de arquitectura, dependencias, rendimiento y diseño técnico MUST documentar
  el problema, la opción elegida y por qué se descartaron las alternativas.
- La documentación vive junto al trabajo (spec/plan del feature o docs del repo), no solo en
  la memoria de quien la tomó.

**Rationale**: El portafolio defiende la capacidad de razonar del autor. El "porqué" es la
tesis; sin él, el código es solo un artefacto sin argumento.

### V. Accesibilidad

La accesibilidad es un mínimo exigible, no un extra.

Reglas:
- El marcado MUST ser HTML semántico.
- El contraste de color MUST cumplir, como mínimo, WCAG 2.1 AA.
- Toda funcionalidad interactiva MUST ser operable por teclado, con foco visible y orden de
  tabulación lógico.
- Las imágenes/medios MUST proveer alternativas textuales adecuadas cuando aporten contenido.

**Rationale**: Un portafolio inaccesible excluye a parte de su audiencia y contradice las
buenas prácticas que pretende demostrar.

## Restricciones Técnicas y Estándares de Calidad

- **Fuente de verdad del diseño**: `alvaro-portfolio` skill, `assets/App.reference.jsx`,
  `assets/CaseStudy.reference.jsx`, `references/design-system.md`.
- **Medios**: `webm` para video; nada de GIF para movimiento.
- **Animación**: solo `transform`/`opacity`; respetar `prefers-reduced-motion`.
- **i18n**: paridad ES/EN total; español por defecto; un solo toggle global.
- **Accesibilidad**: HTML semántico, contraste WCAG 2.1 AA mínimo, navegación por teclado.
- **Rendimiento**: objetivo Lighthouse alto; las regresiones bloquean la entrega.

## Flujo de Desarrollo y Puertas de Calidad

- Toda spec, plan y conjunto de tareas MUST verificar el cumplimiento de estos principios en
  su "Constitution Check" antes de avanzar de fase.
- Cualquier cambio que toque diseño, contenido, paleta, tipografía o estructura MUST contar
  con aprobación explícita previa; de lo contrario se rechaza.
- Las puertas de calidad antes de considerar un trabajo "hecho":
  1. Fidelidad al diseño verificada contra la referencia.
  2. Sin regresiones de rendimiento (animación solo con transform; medios optimizados).
  3. Paridad ES/EN comprobada para todo texto nuevo o modificado.
  4. Accesibilidad: semántica, contraste y navegación por teclado verificadas.
  5. Decisiones técnicas relevantes documentadas con su porqué.

## Governance

Esta constitución supersede cualquier otra práctica o preferencia en el repositorio. En caso
de conflicto entre una solicitud y estos principios, prevalecen los principios y se debe
señalar el conflicto antes de proceder.

- **Enmiendas**: requieren documentación del cambio, justificación y aprobación explícita del
  autor. Toda enmienda actualiza este archivo y, si corresponde, las plantillas dependientes.
- **Versionado** (semántico):
  - MAJOR: eliminación o redefinición incompatible de principios o de la gobernanza.
  - MINOR: adición de un principio/sección o expansión material de la guía.
  - PATCH: aclaraciones, redacción o correcciones sin cambio semántico.
- **Cumplimiento**: cada PR/revisión MUST verificar el cumplimiento. La complejidad o las
  desviaciones MUST justificarse explícitamente; lo no justificado se rechaza.

**Version**: 1.0.0 | **Ratified**: 2026-06-03 | **Last Amended**: 2026-06-03
