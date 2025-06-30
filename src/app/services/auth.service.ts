import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService,
  ) {
    // Detecta si hay sesión activa y la mantiene
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((credentials) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.userSubject.next(credentials.user);
        this.router.navigateByUrl('/');
      })
    );
  }

  logout() {
    signOut(this.auth).then(() => {
      sessionStorage.clear();
      localStorage.clear();
      this.userSubject.next(null);
      this.router.navigate(['/auth/login']);
      this.toastr.success('Sesión cerrada');
    }).catch(() => {
      this.toastr.error('Error cerrando sesión');
    });
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

}
