// shared.service.ts
import { Injectable } from '@angular/core'
import { Subject, Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private favoriteAddedSource = new Subject<void>()
  private isLoggedInSubject = new BehaviorSubject<boolean>(false)

  // Observable for UserStatus
  isLoggedIn$ = this.isLoggedInSubject.asObservable()
  constructor() {
    this.checkUserLoggedInStatus()
  }

  // Observable to subscribe to favorite added events
  favoriteAdded$ = this.favoriteAddedSource.asObservable()

  // Method to trigger a favorite added event
  triggerFavoriteAdded(): void {
    this.favoriteAddedSource.next()
  }
  // Method to check if the user is logged in
  private checkUserLoggedInStatus(): void {
    const userString = localStorage.getItem('user');
    const isLoggedIn = userString !== null && userString.trim() !== '';
    this.isLoggedInSubject.next(isLoggedIn);
  }

  // Method to set the user's status as loggedin
  setUserLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
}
