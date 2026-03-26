<template>
  <!-- TOAST NOTIFICATION -->
  <Transition name="toast">
    <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
  </Transition>

  <!-- NAVBAR -->
  <nav class="nav">
    <RouterLink to="/" class="nav-brand"> Editorial <span>Nova</span> </RouterLink>
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/libros" class="nav-link">Catálogo</RouterLink>
    </div>
  </nav>

  <!-- ROUTER VIEW con transición -->
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component
        :is="Component"
        :libros="libros"
        :usuario="usuario"
        @agregar="agregarLibro"
        @eliminar="eliminarLibro"
        @toast="mostrarToast"
      />
    </Transition>
  </RouterView>
</template>

<script>
export default {
  name: 'App',

  // ── MODEL (datos reactivos) ──────────────────────────────────────
  data() {
    return {
      usuario: 'Estudiante Nova',
      toastMsg: '',
      toastTimer: null,

      libros: [
        {
          id: 1,
          titulo: 'Cien años de soledad',
          autor: 'Gabriel García Márquez',
          categoria: 'Novela',
          descripcion:
            'La saga de la familia Buendía en el mítico Macondo, epicentro del realismo mágico latinoamericano.',
        },
        {
          id: 2,
          titulo: 'Una breve historia del tiempo',
          autor: 'Stephen Hawking',
          categoria: 'Ciencia',
          descripcion:
            'Exploración accesible de los grandes misterios del universo: el tiempo, el espacio y los agujeros negros.',
        },
        {
          id: 3,
          titulo: 'Sapiens',
          autor: 'Yuval Noah Harari',
          categoria: 'Historia',
          descripcion:
            'Un recorrido por la historia de la humanidad desde los primeros Homo sapiens hasta el presente.',
        },
        {
          id: 4,
          titulo: 'El proyecto Phoenix',
          autor: 'Gene Kim',
          categoria: 'Tecnología',
          descripcion:
            'Novela sobre transformación digital, DevOps y cultura organizacional en una empresa de TI.',
        },
      ],

      nextId: 5,
    };
  },

  // ── VIEWMODEL (métodos que modifican el Model) ───────────────────
  methods: {
    agregarLibro(datos) {
      // Evitar duplicados (mismo título + autor)
      const duplicado = this.libros.some(
        (l) =>
          l.titulo.toLowerCase() === datos.titulo.toLowerCase() &&
          l.autor.toLowerCase() === datos.autor.toLowerCase()
      );
      if (duplicado) {
        this.mostrarToast('⚠ Este libro ya existe en el catálogo');
        return;
      }

      this.libros.push({ id: this.nextId++, ...datos });
      this.mostrarToast(`"${datos.titulo}" agregado correctamente`);
    },

    // filter() devuelve un nuevo array → Vue detecta el cambio y actualiza la vista
    eliminarLibro(id) {
      const libro = this.libros.find((l) => l.id === id);
      this.libros = this.libros.filter((l) => l.id !== id);
      this.mostrarToast(`"${libro?.titulo}" eliminado`);
    },

    mostrarToast(msg) {
      this.toastMsg = '';
      clearTimeout(this.toastTimer);
      // pequeño delay para reiniciar animación si ya hay toast activo
      setTimeout(() => {
        this.toastMsg = msg;
        this.toastTimer = setTimeout(() => {
          this.toastMsg = '';
        }, 2800);
      }, 50);
    },
  },
};
</script>

<style>
/* ── RESET & VARIABLES ─────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cream: #f5f0e8;
  --ink: #1a1207;
  --sepia: #8b6f47;
  --rust: #c4502a;
  --sage: #4a6741;
  --gold: #d4a843;
  --paper: #ede8dc;
  --shadow: rgba(26, 18, 7, 0.12);
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  min-height: 100vh;
}

/* ── NAVBAR ────────────────────────────────────────────────────── */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(245, 240, 232, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
}

.nav-brand {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.03em;
  text-decoration: none;
}
.nav-brand span {
  color: var(--rust);
  font-style: italic;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--sepia);
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.nav-link:hover {
  background: var(--paper);
  color: var(--ink);
}
.nav-link.router-link-active {
  background: var(--ink);
  color: var(--cream);
}

/* ── TOAST ─────────────────────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  background: var(--ink);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 0.85rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

/* ── TRANSICIONES ──────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ── UTILIDADES GLOBALES ───────────────────────────────────────── */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.75rem 1.6rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.btn-primary {
  background: var(--ink);
  color: var(--cream);
}
.btn-primary:hover {
  background: var(--rust);
  transform: translateY(-1px);
}
.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1.5px solid rgba(26, 18, 7, 0.25);
}
.btn-ghost:hover {
  border-color: var(--ink);
  background: var(--paper);
}
.btn-danger {
  background: transparent;
  color: var(--rust);
  border: 1.5px solid rgba(196, 80, 42, 0.3);
  font-size: 0.72rem;
  padding: 0.4rem 0.85rem;
}
.btn-danger:hover {
  background: var(--rust);
  color: white;
  border-color: var(--rust);
}

@media (max-width: 700px) {
  .nav {
    padding: 0 1rem;
  }
  .container {
    padding: 0 1rem;
  }
}
</style>
