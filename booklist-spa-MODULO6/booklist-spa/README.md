# BookList SPA — Editorial Nova

Proyecto integrador Módulo 6 de Alkemy: Desarrollo de Interfaces Interactivas con Vue.js.

## Instalación

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Estructura del proyecto

```
booklist-spa/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue                  ← Estado global, router-view, navbar
    ├── router/
    │   └── index.js             ← Rutas: / | /libros | /libros/:id
    ├── components/
    │   ├── Libro.vue            ← Tarjeta reutilizable (props + emits)
    │   └── FormLibro.vue        ← Formulario con v-model
    └── views/
        ├── InicioView.vue       ← Bienvenida + contador MVVM
        ├── ListaLibros.vue      ← Catálogo con filtros reactivos
        └── DetalleLibro.vue     ← Detalle por ruta dinámica
```

## Conceptos de Vue.js aplicados

| Lección | Concepto | Archivos |
|---------|----------|----------|
| 1 | MVVM, data, methods, contador reactivo | App.vue, InicioView.vue |
| 2 | v-for, v-if, v-show, v-bind | Libro.vue, ListaLibros.vue |
| 3 | v-model, formulario reactivo, preview en tiempo real | FormLibro.vue |
| 4 | @click, @submit.prevent, @keyup.enter, .once | FormLibro.vue, Libro.vue |
| 5 | Vue Router, rutas dinámicas, props: true | router/index.js, DetalleLibro.vue |
