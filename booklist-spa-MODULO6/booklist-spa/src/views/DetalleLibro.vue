<template>
  <div class="container detalle-wrap">

    <!-- CASO BORDE: ID inexistente en el catálogo -->
    <div v-if="!libro" class="not-found">
      <h2>Libro no encontrado</h2>
      <p>El ID <code>#{{ id }}</code> no existe en el catálogo.</p>
      <RouterLink to="/libros" class="btn btn-primary">← Volver al catálogo</RouterLink>
    </div>

    <!-- DETALLE COMPLETO -->
    <template v-else>

      <!-- Breadcrumb de navegación -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span class="sep">›</span>
        <RouterLink to="/libros">Catálogo</RouterLink>
        <span class="sep">›</span>
        <span>{{ libro.titulo }}</span>
      </nav>

      <div class="detalle-grid">

        <!-- Portada generada con color según categoría -->
        <div class="detalle-cover" :style="{ background: coverGradient }">
          <span class="cover-title">{{ libro.titulo }}</span>
        </div>

        <!-- Información del libro -->
        <div class="detalle-info">
          <p class="detalle-eyebrow">{{ libro.categoria }}</p>
          <h1 class="detalle-titulo">{{ libro.titulo }}</h1>
          <p class="detalle-autor">{{ libro.autor }}</p>

          <div class="detalle-meta">
            <div class="meta-item">
              <span class="meta-key">ID</span>
              <span class="meta-val">#{{ idFormateado }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-key">Categoría</span>
              <span class="meta-val">{{ libro.categoria }}</span>
            </div>
          </div>

          <!-- v-show: muestra descripción solo si existe -->
          <p v-show="libro.descripcion" class="detalle-desc">
            {{ libro.descripcion }}
          </p>
          <p v-if="!libro.descripcion" class="detalle-desc muted">
            Sin descripción disponible.
          </p>

          <div class="detalle-actions">
            <RouterLink to="/libros" class="btn btn-ghost">← Volver</RouterLink>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DetalleLibro',

  // id viene de route.params.id gracias a props: true en el router
  props: {
    libros: { type: Array, required: true },
    id:     { type: [String, Number], required: true }
  },

  // ── VIEWMODEL: computed ────────────────────────────────────────
  computed: {
    libro() {
      // Busca el libro cuyo id coincida con el parámetro de la ruta
      return this.libros.find(l => l.id === Number(this.id)) || null
    },

    idFormateado() {
      return this.libro ? String(this.libro.id).padStart(4, '0') : ''
    },

    coverGradient() {
      const gradients = {
        Novela:     'linear-gradient(135deg,#c4502a,#7a2f18)',
        Ciencia:    'linear-gradient(135deg,#4a6741,#2d3f28)',
        Historia:   'linear-gradient(135deg,#d4a843,#9a7220)',
        Tecnología: 'linear-gradient(135deg,#5a7fa8,#2d4f78)',
        Otro:       'linear-gradient(135deg,#8b6f47,#4a3520)'
      }
      return this.libro
        ? (gradients[this.libro.categoria] || gradients.Otro)
        : ''
    }
  }
}
</script>

<style scoped>
.detalle-wrap { padding: 3rem 0 5rem; }

/* Not found */
.not-found { text-align: center; padding: 6rem 0; }
.not-found h2 {
  font-family: var(--font-display); font-size: 2rem; font-weight: 700;
  margin-bottom: 0.75rem;
}
.not-found p { color: var(--sepia); margin-bottom: 2rem; }
.not-found code {
  font-family: var(--font-mono); background: var(--paper);
  padding: 0.1rem 0.4rem; border-radius: 3px;
}

/* Breadcrumb */
.breadcrumb {
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--sepia);
  letter-spacing: 0.06em; margin-bottom: 2.5rem;
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
}
.breadcrumb a { color: var(--sepia); text-decoration: none; }
.breadcrumb a:hover { color: var(--rust); }
.sep { opacity: 0.4; }

/* Grid detalle */
.detalle-grid {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 4rem; align-items: start;
}
.detalle-cover {
  aspect-ratio: 2/3; border-radius: 4px 10px 10px 4px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 6px 6px 24px var(--shadow); padding: 1rem;
}
.cover-title {
  font-family: var(--font-display); font-weight: 900; font-size: 0.9rem;
  color: rgba(255,255,255,0.9); text-align: center; line-height: 1.3;
}

/* Info */
.detalle-eyebrow {
  font-family: var(--font-mono); font-size: 0.7rem; color: var(--sepia);
  letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem;
}
.detalle-titulo {
  font-family: var(--font-display); font-size: 2.4rem; font-weight: 900;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 0.4rem;
}
.detalle-autor {
  font-family: var(--font-display); font-size: 1.1rem;
  font-style: italic; color: var(--sepia); margin-bottom: 1.8rem;
}
.detalle-meta {
  display: flex; gap: 2rem; margin-bottom: 1.8rem;
  padding-bottom: 1.8rem; border-bottom: 1px solid rgba(139,111,71,0.2);
}
.meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
.meta-key {
  font-family: var(--font-mono); font-size: 0.65rem;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--sepia);
}
.meta-val { font-size: 0.9rem; font-weight: 500; }

.detalle-desc { font-size: 1rem; line-height: 1.8; color: var(--sepia); }
.detalle-desc.muted { opacity: 0.5; font-style: italic; }

.detalle-actions { margin-top: 2.5rem; }

@media (max-width: 700px) {
  .detalle-grid { grid-template-columns: 1fr; gap: 2rem; }
  .detalle-cover { width: 160px; margin: 0 auto; }
}
</style>
