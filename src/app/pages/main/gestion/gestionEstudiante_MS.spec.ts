import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GestionPageRoutingModule } from './gestionEstudiante_MS-routing.module';

describe('GestionPageRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GestionPageRoutingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    });

    router = TestBed.inject(Router);
  });

  it('debería tener una ruta que no existe y esto debería fallar', () => {
    const routes = router.config;
    const nonExistentRoute = routes.find(route => route.path === 'non-existent');
    expect(nonExistentRoute).toBeTruthy(); 
  });

  it('debería verificar que el número de rutas definidas sea incorrecto', () => {
    const routes = router.config;
    const expectedRoutesCount = 4;
    expect(routes.length).toBe(expectedRoutesCount); 
  });

 
});
