import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userRole: string = 'admin';

  setRole(role: string): void {
    this.userRole = role;
  }

  getRole(): string {
    return this.userRole;
  }
}
