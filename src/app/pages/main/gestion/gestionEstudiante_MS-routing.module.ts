import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionPage } from './gestionEstudiante_MS.page';

// Rutas de documentos
const DOCUMENT_ROUTES = [
  'doc',
  'doc_fisio',
  'doc_Dentista',
  'doc_oculista',
];

// Definición de rutas
const routes: Routes = [
  {
    path: '',
    component: GestionPage,
    // Puedes agregar una guardia aquí si es necesario
    // canActivate: [AuthGuard], // Por ejemplo, si se requiere autenticación
  },
  // Cargar módulos de documentos de manera diferida
  ...DOCUMENT_ROUTES.map(route => ({
    path: route,
    loadChildren: () => import(`./${route}/${route}.module`).then(m => m.DocPageModule),
  })),
  // Ruta para manejar el caso de un módulo no encontrado
  {
    path: '**',
    redirectTo: '', // Redirigir a la página principal o agregar un componente 404
    // component: NotFoundComponent, // Si tienes un componente de 404
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionPageRoutingModule {}
