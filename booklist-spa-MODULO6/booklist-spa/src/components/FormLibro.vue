<template>
  <div class="form-card">
    <h2 class="form-title">✦ Agregar nuevo libro</h2>

    <!-- Preview en tiempo real (v-if: solo renderiza si hay título) -->
    <div v-if="nuevoLibro.titulo" class="preview-tag">
      Vista previa:
      <strong>{{ nuevoLibro.titulo }}</strong>
      <span v-if="nuevoLibro.autor"> · {{ nuevoLibro.autor }}</span>
      <span v-if="nuevoLibro.categoria"> [{{ nuevoLibro.categoria }}]</span>
    </div>

    <!--
      @submit.prevent — modificador que cancela el comportamiento por defecto del form
      @keyup.enter en inputs dispara también el envío
    -->
    <form @submit.prevent="agregarLibro">
      <div class="form-grid">

        <!-- v-model vincula el input al modelo de datos en tiempo real -->
        <div class="form-group">
          <label for="titulo">Título *</label>
          <input
            id="titulo"
            v-model="nuevoLibro.titulo"
            placeholder="Ej: El gran Gatsby"
            @keyup.enter="agregarLibro"
          />
        </div>

        <div class="form-group">
          <label for="autor">Autor *</label>
          <input
            id="autor"
            v-model="nuevoLibro.autor"
            placeholder="Ej: F. Scott Fitzgerald"
            @keyup.enter="agregarLibro"
          />
        </div>

        <!-- v-model en select -->
        <div class="form-group">
          <label for="categoria">Categoría *</label>
          <select id="categoria" v-model="nuevoLibro.categoria">
            <option value="" disabled>Seleccionar…</option>
            <option
              v-for="cat in categorias"
              :key="cat"
              :value="cat"
            >{{ cat }}</option>
          </select>
        </div>

        <!-- v-model en textarea -->
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="nuevoLibro.descripcion"
            placeholder="Breve descripción del libro…"
            rows="3"
          ></textarea>
        </div>

      </div>

      <!-- Mensaje de error con v-if -->
      <p v-if="error" class="form-error">⚠ {{ error }}</p>

      <div class="form-row">
        <!-- .once: el botón limpiar solo ejecuta el handler la primera vez
             (ejemplo de uso del modificador .once en eventos) -->
        <button
          type="button"
          class="btn btn-ghost"
          @click.once="limpiarFormulario"
          @click="limpiarFormulario"
        >
          Limpiar
        </button>
        <button type="submit" class="btn btn-primary">
          + Agregar libro
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormLibro',

  emits: ['agregar'],

  data() {
    return {
      // Objeto que representa el nuevo libro (Model del formulario)
      nuevoLibro: {
        titulo:      '',
        autor:       '',
        categoria:   '',
        descripcion: ''
      },
      error: '',
      categorias: ['Novela', 'Ciencia', 'Historia', 'Tecnología', 'Otro']
    }
  },

  methods: {
    agregarLibro() {
      // Validación de campos obligatorios
      if (
        !this.nuevoLibro.titulo.trim() ||
        !this.nuevoLibro.autor.trim() ||
        !this.nuevoLibro.categoria
      ) {
        this.error = 'Título, autor y categoría son obligatorios.'
        return
      }

      this.error = ''

      // Emite hacia App.vue con una copia del objeto
      this.$emit('agregar', { ...this.nuevoLibro })

      // Limpia el formulario tras enviar
      this.limpiarFormulario()
    },

    limpiarFormulario() {
      this.nuevoLibro = { titulo: '', autor: '', categoria: '', descripcion: '' }
      this.error = ''
    }
  }
}
</script>

<style scoped>
.form-card {
  background: var(--paper);
  border: 1px solid rgba(139, 111, 71, 0.2);
  border-radius: 8px; padding: 2rem;
  margin-bottom: 2.5rem;
  position: relative; overflow: hidden;
}
.form-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--rust), var(--gold));
}
.form-title {
  font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
  margin-bottom: 1.2rem;
}
.preview-tag {
  display: inline-flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;
  font-family: var(--font-mono); font-size: 0.7rem;
  background: rgba(74, 103, 65, 0.12); color: var(--sage);
  border: 1px solid rgba(74, 103, 65, 0.25);
  padding: 0.35rem 0.8rem; border-radius: 20px;
  margin-bottom: 1.2rem;
}
.form-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
}
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

label {
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500;
  color: var(--sepia); text-transform: uppercase; letter-spacing: 0.08em;
}
input, select, textarea {
  font-family: var(--font-body); font-size: 0.9rem;
  background: var(--cream); color: var(--ink);
  border: 1.5px solid rgba(139, 111, 71, 0.25);
  border-radius: 5px; padding: 0.6rem 0.85rem;
  outline: none; transition: border-color 0.2s; width: 100%;
}
input:focus, select:focus, textarea:focus {
  border-color: var(--sepia);
  box-shadow: 0 0 0 3px rgba(139, 111, 71, 0.1);
}
textarea { resize: vertical; }

.form-error {
  color: var(--rust); font-family: var(--font-mono);
  font-size: 0.75rem; margin-top: 0.75rem;
}
.form-row {
  display: flex; justify-content: flex-end;
  gap: 0.75rem; margin-top: 1.2rem;
}

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>
