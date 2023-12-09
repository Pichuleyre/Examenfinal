import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    usuario: '',
    password: '',
  };

  constructor(
    private router: Router,
    public toastController: ToastController
  ) {}

  firebaseSvc = inject(FirebaseService);

  ngOnInit() {}

  submit(){
    
  }

  register() {
    this.router.navigate(['/register']);
  }

  field: string = '';
  validateModel(model: any) {

    
    for (var [key, value] of Object.entries(model)) {

      if (value == '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }

}
