import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    // Detecta si hay sesión activa y la mantiene
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((credentials) => {
        this.userSubject.next(credentials.user);
        this.router.navigateByUrl('/'); // redirige al inicio después del login
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
