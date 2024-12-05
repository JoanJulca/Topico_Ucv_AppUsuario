import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';

@Component({
  selector: 'app-main',
  templateUrl: './mainEstudiante_MS.page.html',
  styleUrls: ['./mainEstudiante_MS.page.scss'],
})
export class MainPage implements OnInit {
  pages = [
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline' },
    { title: 'Gestion', url: '/main/gestion', icon: 'person-outline' },
    { title: 'Citas Concluidas', url: '/main/cita-concluida', icon: 'medical-outline' },
    { title: 'Citas Pendientes', url: '/main/cita-pendiente', icon: 'medical-outline' },
  ];

  router = inject(Router);
  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc = inject(UtilsEDTService);
  
  currentPath: string = '';
  ngOnInit() {
    this.router.events.subscribe(event => {
      this.updateCurrentPath(event);
    });
  }
  private updateCurrentPath(event: any): void {
    if (event?.url) {
      this.currentPath = event.url;
    }
  }
  user(): user_ETD {
    return this.utilsSvc.getFromLocalStorage('users');
  }
  // Cerrar sesión
  async singOut(): Promise<void> {
    try {
      await this.firebaseSvc.sigOut();
      this.utilsSvc.presentToast({
        message: 'Sesión cerrada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.utilsSvc.presentToast({
        message: 'Error al cerrar sesión, intenta de nuevo.',
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }
  }
}
