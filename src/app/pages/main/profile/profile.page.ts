import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserExtra } from 'src/app/models/userExtra.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  miViaje:any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  async takeImage(){
    let user = this.user();

    const dataUrl = (await this.utilsSvc.takePicture('Imagen de tu perfil')).dataUrl;

    let imagePath = `${user.uid}/profile`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
  }

  ionViewWillEnter() {
    this.getProduct();
    this.user();
  }

  getProduct(){
    let path = `products`;
    let user = this.user();
    
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
      
        this.miViaje = res.filter((respuesta) =>{
          return respuesta.uid === user.uid;
        })[0]
        console.log("Tu viaje");
        console.log(this.miViaje);
        this.lastTrip(this.miViaje);
        let checkTrip = res.some((respuesta) => {
          return respuesta.uid === user.uid;
        });
        console.log('Devuelve true si hay viaje creado');
        console.log(checkTrip);
        this.utilsSvc.saveInLocalStorage('checkTrip', checkTrip);
        sub.unsubscribe();
      }
    })
  }

  lastTrip(value: any){
    if (value){
      console.log("Viaje Guardado")
      this.utilsSvc.saveInLocalStorage('lastTrip',value);
    }else{
      console.log("Viaje No Existe")
    }
    
  }
}
