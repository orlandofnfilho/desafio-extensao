import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private api: LoginService) { }
  
  ngOnInit(): void {
  }

  sair() {
    this.api.logout();
  }

  logado() {
    return this.api.logado;
  }
}
