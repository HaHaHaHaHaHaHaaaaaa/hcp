import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isChanged:boolean=true;
  constructor(public navCtrl: NavController,private appservice:AppServiceProvider) {

  }

  opendb(){
    this.appservice.createDb('www')
  }

  add(){
    this.appservice.add('students',new Date())
  }
}
