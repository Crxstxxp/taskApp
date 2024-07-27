import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {
    this.email = '';
    this.password = '';
  }

  email: string;
  password: string;

  login() {
    this.authService.login(this.email, this.password);
  }

  ngOnInit() {}
}
