import { createRouter, createWebHistory } from 'vue-router'
import InicioView    from '../views/InicioView.vue'
import ListaLibros   from '../views/ListaLibros.vue'
import DetalleLibro  from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibros
  },
  {
    // Ruta dinámica — :id se pasa como prop al componente
    path: '/libros/:id',
    name: 'detalle',
    component: DetalleLibro,
    props: true          // convierte route.params.id en prop del componente
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
