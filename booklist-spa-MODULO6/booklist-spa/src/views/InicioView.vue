<template>
  <div class="container">

    <!-- ── HERO ── -->
    <section class="hero">
      <div>
        <p class="hero-eyebrow">✦ Sistema de gestión editorial</p>

        <!-- Lección 1: mostrar nombre del usuario con interpolación -->
        <p class="hero-welcome">Bienvenido/a, <strong>{{ usuario }}</strong></p>

        <h1 class="hero-title">
          Catálogo<br>
          <em>inteligente</em><br>
          de libros
        </h1>
        <p class="hero-sub">
          Administrá el inventario literario de Editorial Nova de forma
          ágil e interactiva con Vue.js.
        </p>

        <div class="hero-ctas">
          <RouterLink to="/libros" class="btn btn-primary">
            Ver catálogo →
          </RouterLink>
          <RouterLink to="/libros" class="btn btn-ghost">
            Agregar libro
          </RouterLink>
        </div>
      </div>

      <!-- Portada decorativa -->
      <div class="hero-visual" aria-hidden="true">
        <div class="book-stack">
          <div class="book-spine bs-1"></div>
          <div class="book-spine bs-2"></div>
          <div class="book-spine bs-3">
            <span class="book-label">Nova</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── LECCIÓN 1: Contador básico con data y methods ── -->
    <section class="contador-section">
      <h2 class="section-title">Contador de visitas</h2>
      <p class="section-sub">Ejemplo de datos reactivos (data + methods + MVVM)</p>
      <div class="contador-widget">
        <button class="btn btn-ghost" @click="decrementar">−</button>
        <span class="contador-valor">{{ visitas }}</span>
        <button class="btn btn-primary" @click="incrementar">+</button>
      </div>
      <!-- v-show: oculta/muestra sin eliminar del DOM -->
      <p v-show="visitas > 0" class="contador-msg">
        Has visitado esta sección {{ visitas }} vez{{ visitas === 1 ? '' : 'es' }}.
      </p>
      <p v-if="visitas === 0" class="contador-msg muted">
        Presioná + para registrar una visita.
      </p>
    </section>

    <!-- ── ESTADÍSTICAS ── -->
    <div class="stats-row">
      <div>
        <div class="stat-num">{{ libros.length }}</div>
        <div class="stat-label">Libros registrados</div>
      </div>
      <div>
        <div class="stat-num">{{ totalCategorias }}</div>
        <div class="stat-label">Categorías</div>
      </div>
      <div>
        <div class="stat-num">∞</div>
        <div class="stat-label">Posibilidades</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InicioView',

  props: {
    libros:  { type: Array,  required: true },
    usuario: { type: String, default: 'Usuario' }
  },

  // ── MODEL ──────────────────────────────────────────────────────
  data() {
    return {
      visitas: 0
    }
  },

  // ── VIEWMODEL: computed ────────────────────────────────────────
  computed: {
    totalCategorias() {
      return new Set(this.libros.map(l => l.categoria)).size
    }
  },

  // ── VIEWMODEL: methods ─────────────────────────────────────────
  methods: {
    incrementar() {
      this.visitas++
    },
    decrementar() {
      if (this.visitas > 0) this.visitas--
    }
  }
}
</script>

<style scoped>
.hero {
  padding: 5rem 0 3rem;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
}
.hero-eyebrow {
  font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500;
  color: var(--rust); letter-spacing: 0.14em; text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.hero-welcome {
  font-size: 0.9rem; color: var(--sepia);
  margin-bottom: 1rem; font-style: italic;
}
.hero-title {
  font-family: var(--font-display); font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 900; line-height: 1.05; letter-spacing: -0.03em;
  margin-bottom: 1.2rem;
}
.hero-title em { color: var(--rust); font-style: italic; }
.hero-sub {
  font-size: 1rem; color: var(--sepia); line-height: 1.7;
  max-width: 38ch; margin-bottom: 2rem;
}
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Libro decorativo */
.hero-visual { display: flex; justify-content: center; }
.book-stack { position: relative; width: 200px; height: 260px; }
.book-spine {
  position: absolute; border-radius: 3px 8px 8px 3px;
  box-shadow: 3px 3px 12px var(--shadow);
}
.bs-1 { width: 155px; height: 215px; background: linear-gradient(135deg,#c4502a,#8b3520); bottom: 0; left: 25px; transform: rotate(-5deg); }
.bs-2 { width: 140px; height: 195px; background: linear-gradient(135deg,#4a6741,#2d4028); bottom: 14px; left: 45px; transform: rotate(2deg); }
.bs-3 { width: 150px; height: 210px; background: linear-gradient(135deg,#d4a843,#a07c25); bottom: 7px; left: 35px; transform: rotate(-1deg); display:flex; align-items:center; justify-content:center; }
.book-label {
  font-family: var(--font-display); font-size: 0.8rem; font-weight: 900;
  color: rgba(255,255,255,0.85); writing-mode: vertical-rl; letter-spacing: 0.12em;
}

/* Contador */
.contador-section {
  background: var(--paper);
  border: 1px solid rgba(139,111,71,0.2);
  border-radius: 8px; padding: 2rem;
  margin-bottom: 2rem; text-align: center;
}
.section-title {
  font-family: var(--font-display); font-size: 1.2rem; font-weight: 700;
  margin-bottom: 0.3rem;
}
.section-sub {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--sepia); margin-bottom: 1.5rem;
}
.contador-widget {
  display: flex; align-items: center; justify-content: center; gap: 1.5rem;
  margin-bottom: 1rem;
}
.contador-valor {
  font-family: var(--font-display); font-size: 3rem; font-weight: 900;
  color: var(--rust); min-width: 3rem; text-align: center; line-height: 1;
}
.contador-msg {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--sepia);
}
.contador-msg.muted { opacity: 0.5; }

/* Stats */
.stats-row {
  display: flex; gap: 3rem; padding: 2.5rem 0;
  border-top: 1px solid rgba(139,111,71,0.2);
}
.stat-num {
  font-family: var(--font-display); font-size: 2.2rem;
  font-weight: 900; color: var(--rust);
}
.stat-label {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--sepia); text-transform: uppercase;
  letter-spacing: 0.08em; margin-top: 0.2rem;
}

@media (max-width: 700px) {
  .hero { grid-template-columns: 1fr; padding: 3rem 0 2rem; }
  .hero-visual { display: none; }
  .stats-row { gap: 2rem; flex-wrap: wrap; }
}
</style>
