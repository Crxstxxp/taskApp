import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  async updateEmail(email: string) {
    const user = await this.afAuth.currentUser;
    return user?.updateEmail(email);
  }

  async updatePassword(password: string) {
    const user = await this.afAuth.currentUser;
    return user?.updatePassword(password);
  }

}
