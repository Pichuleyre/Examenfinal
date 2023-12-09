import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
data: any;
  constructor(private router: Router, private activeroute: ActivatedRoute) {

    this.activeroute.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation()?.extras.state) { 
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user']; 
        console.log(this.data) 
      }else{this.router.navigate(["/login"])} 
    });
  }
  
  Ingresar(){
    this.router.navigate(['/crear-viaje']);
  }
}
