import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = '';
  currentEmail: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.afAuth.currentUser
      .then((user) => {
        if (user) {
          this.currentEmail = user.email!;
          this.profileForm.patchValue({
            email: this.currentEmail,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching user details', error);
      });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const { password } = this.profileForm.value;
      this.authService.updatePassword(password).catch((error) => {
        this.errorMessage = 'Error al actualizar la contraseña.';
        console.error('Error updating password', error);
      });
    }
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
