<template>
  <!-- v-bind aplica clase dinámica según categoría -->
  <article class="book-card">
    <div class="book-card-accent" :class="categoriaClass"></div>

    <p class="book-id">ID #{{ idFormateado }}</p>

    <!-- v-bind en atributos (forma abreviada con :) -->
    <h3 class="book-titulo">{{ libro.titulo }}</h3>
    <p class="book-autor">{{ libro.autor }}</p>
    <span class="book-cat">{{ libro.categoria }}</span>

    <!-- v-show: el elemento existe en el DOM pero se oculta con display:none -->
    <p v-show="libro.descripcion" class="book-desc">
      {{ libro.descripcion }}
    </p>

    <div class="book-actions">
      <RouterLink :to="'/libros/' + libro.id" class="book-link">
        Ver detalle →
      </RouterLink>

      <!-- @click con método que recibe parámetro -->
      <button class="btn btn-danger" @click="confirmarEliminar">
        Eliminar
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Libro',

  // Props recibidas desde el componente padre
  props: {
    libro: {
      type: Object,
      required: true
    }
  },

  // Evento personalizado que emite hacia el padre
  emits: ['eliminar'],

  // ── VIEWMODEL ─────────────────────────────────────────────────
  computed: {
    // Propiedades calculadas: se actualizan automáticamente cuando cambia la prop
    idFormateado() {
      return String(this.libro.id).padStart(4, '0')
    },

    categoriaClass() {
      const mapa = {
        Novela:      'cat-novela',
        Ciencia:     'cat-ciencia',
        Historia:    'cat-historia',
        Tecnología:  'cat-tecnologia'
      }
      return mapa[this.libro.categoria] || 'cat-default'
    }
  },

  methods: {
    confirmarEliminar() {
      // Confirmación opcional antes de eliminar
      if (confirm(`¿Eliminar "${this.libro.titulo}"?`)) {
        this.$emit('eliminar', this.libro.id)
      }
    }
  }
}
</script>

<style scoped>
.book-card {
  background: var(--paper);
  border: 1px solid rgba(139, 111, 71, 0.18);
  border-radius: 8px; padding: 1.5rem;
  position: relative; overflow: hidden;
  transition: box-shadow 0.25s, transform 0.25s;
}
.book-card:hover {
  box-shadow: 0 8px 32px var(--shadow);
  transform: translateY(-3px);
}

.book-card-accent {
  position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
  border-radius: 8px 0 0 8px;
}
.cat-novela     { background: var(--rust); }
.cat-ciencia    { background: var(--sage); }
.cat-historia   { background: var(--gold); }
.cat-tecnologia { background: #5a7fa8; }
.cat-default    { background: var(--sepia); }

.book-id {
  font-family: var(--font-mono); font-size: 0.65rem;
  color: var(--sepia); letter-spacing: 0.1em; margin-bottom: 0.5rem;
}
.book-titulo {
  font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
  line-height: 1.3; margin-bottom: 0.3rem;
}
.book-autor {
  font-size: 0.82rem; color: var(--sepia);
  font-style: italic; margin-bottom: 0.8rem;
}
.book-cat {
  display: inline-block;
  font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase;
  letter-spacing: 0.1em; padding: 0.2rem 0.7rem;
  border-radius: 3px; background: rgba(139, 111, 71, 0.12); color: var(--sepia);
}
.book-desc {
  font-size: 0.83rem; color: var(--sepia); line-height: 1.55;
  margin-top: 0.8rem;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.book-actions {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 1.2rem; padding-top: 1rem;
  border-top: 1px solid rgba(139, 111, 71, 0.15);
}
.book-link {
  font-family: var(--font-mono); font-size: 0.7rem;
  color: var(--sepia); text-decoration: none; letter-spacing: 0.04em;
  transition: color 0.2s;
}
.book-link:hover { color: var(--rust); }
</style>
