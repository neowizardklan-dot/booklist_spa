<template>
  <div class="container">

    <!-- Encabezado de página -->
    <div class="page-header">
      <h1 class="page-title">Catálogo</h1>
      <span class="page-count">
        {{ librosFiltrados.length }} / {{ libros.length }} libros
      </span>
    </div>

    <!-- FormLibro: componente hijo que emite @agregar -->
    <FormLibro @agregar="onAgregar" />

    <!-- Filtro por categoría — botones dinámicos con v-for -->
    <div class="filter-row" role="group" aria-label="Filtrar por categoría">
      <button
        v-for="cat in categorias"
        :key="cat"
        class="filter-btn"
        :class="{ active: filtroActivo === cat }"
        @click="filtroActivo = cat"
      >{{ cat }}</button>
    </div>

    <!-- EMPTY STATE: v-if cuando no hay resultados -->
    <div v-if="librosFiltrados.length === 0" class="empty-state">
      <div class="empty-icon">📚</div>
      <p>No hay libros en esta categoría.<br>¡Agregá el primero!</p>
    </div>

    <!-- LISTA REACTIVA: v-for con :key obligatorio -->
    <div v-else class="books-grid">
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @eliminar="onEliminar"
      />
    </div>

  </div>
</template>

<script>
import Libro     from '../components/Libro.vue'
import FormLibro from '../components/FormLibro.vue'

export default {
  name: 'ListaLibros',

  components: { Libro, FormLibro },

  props: {
    libros: { type: Array, required: true }
  },

  emits: ['agregar', 'eliminar', 'toast'],

  // ── MODEL ──────────────────────────────────────────────────────
  data() {
    return {
      filtroActivo: 'Todos'
    }
  },

  // ── VIEWMODEL: computed ────────────────────────────────────────
  computed: {
    // Lista dinámica de categorías para los botones de filtro
    categorias() {
      const cats = ['Todos', ...new Set(this.libros.map(l => l.categoria))]
      return cats
    },

    // Libros filtrados reactivamente
    librosFiltrados() {
      if (this.filtroActivo === 'Todos') return this.libros
      return this.libros.filter(l => l.categoria === this.filtroActivo)
    }
  },

  // ── VIEWMODEL: methods ─────────────────────────────────────────
  methods: {
    onAgregar(datos) {
      this.$emit('agregar', datos)
    },

    onEliminar(id) {
      this.$emit('eliminar', id)
    }
  }
}
</script>

<style scoped>
.page-header {
  padding: 3rem 0 2rem;
  display: flex; align-items: flex-end; justify-content: space-between;
  border-bottom: 1px solid rgba(139,111,71,0.2);
  margin-bottom: 2.5rem;
}
.page-title {
  font-family: var(--font-display); font-size: 2.4rem;
  font-weight: 900; letter-spacing: -0.03em; line-height: 1;
}
.page-count {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--sepia);
}

/* Filtros */
.filter-row { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
.filter-btn {
  font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase;
  letter-spacing: 0.07em; padding: 0.4rem 0.9rem;
  border: 1.5px solid rgba(139,111,71,0.25);
  border-radius: 20px; background: transparent;
  color: var(--sepia); cursor: pointer; transition: all 0.15s;
}
.filter-btn:hover { border-color: var(--sepia); color: var(--ink); }
.filter-btn.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }

/* Empty state */
.empty-state {
  text-align: center; padding: 5rem 2rem;
  color: var(--sepia); font-family: var(--font-mono); font-size: 0.85rem;
}
.empty-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.4; }
.empty-state p { line-height: 1.7; }

/* Grid */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  padding-bottom: 4rem;
}
</style>
