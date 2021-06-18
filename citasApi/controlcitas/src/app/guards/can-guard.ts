import { tap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CanGuard implements CanActivate {
    constructor(private authSvc: AuthService) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authSvc.user$.pipe(
            take(1),
            map((user) => user && (this.authSvc.isAdmin(user) || this.authSvc.isEmployee(user))),
            tap((canEdit) => {
                if (!canEdit) {
                    window.alert('Acceso denegado');
                }
            })
        );
    }
}
