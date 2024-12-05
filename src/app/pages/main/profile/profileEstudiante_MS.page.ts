import { Component, OnInit, inject } from '@angular/core';
import { user_ETD } from 'src/app/models/user.model';
import { FirebaseEDTService } from 'src/app/services/firebase_EDT.service';
import { UtilsEDTService } from 'src/app/services/utils_EDT.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profileEstudiante_MS.page.html',
  styleUrls: ['./profileEstudiante_MS.page.scss'],
})
export class ProfilePage implements OnInit {
  firebaseSvc = inject(FirebaseEDTService);
  utilsSvc = inject(UtilsEDTService);
  ngOnInit() {}
  // Obtener el usuario actual desde el almacenamiento local
  user(): user_ETD {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  //========= Tomar / seleccionar imágenes y actualizar perfil ==========
  
  
  async takeImage() {
    const user = this.user();
    const path = `user/${user.uid}`;
    const imagePath = `${user.uid}/profile`;
    try {

      // Captura de imagen
      const dataUrl = (await this.utilsSvc.takePicture
        ('Imagen del perfil')).dataUrl;
      const loading = await this.utilsSvc.loading();
      await loading.present();


      // Subir imagen a Firebase y actualizar el documento
      user.fotogra = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      await this.firebaseSvc.updateDocument(path, { image: user.fotogra });
     
      
     
      // Actualizar almacenamiento local y mostrar éxito
      this.utilsSvc.saveInLocalStorage('user', user);
      this.utilsSvc.presentToast({
        message: 'Foto de perfil actualizada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.utilsSvc.presentToast({
        message: 'No se pudo actualizar la foto de perfil',
        duration: 2500,
        color: '#003B5C',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      const loading = await this.utilsSvc.loading();
      loading.dismiss();
    }
  }
}
