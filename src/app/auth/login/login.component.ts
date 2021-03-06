import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
  };
 
  constructor(private auth: AuthService) {}
 
  ngOnInit(): void {}
 
  login() {
    this.auth.login(this.user).subscribe({
      next: () => {
        alert('login successful');
      },
      error: (error) => {
        alert('login failed');
      },
    });
  }
}