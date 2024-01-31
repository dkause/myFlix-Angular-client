// shared.service.ts
import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private favoriteAddedSource = new Subject<void>()
  private isLoggedIn: boolean = false

  // Observable to subscribe to favorite added events
  favoriteAdded$ = this.favoriteAddedSource.asObservable()

  // Method to trigger a favorite added event
  triggerFavoriteAdded(): void {
    this.favoriteAddedSource.next()
  }
  // Method to check if the user is logged in
  isUserLoggedIn(): boolean {
    const userString = localStorage.getItem('user')
    const isLoggedIn =
      userString !== null &&
      userString !== undefined &&
      userString.trim() !== ''
    console.log('isUserLoggedIn called. Returning:', isLoggedIn)
    return isLoggedIn
  }

  // Method to set the user's login status
  setUserLoggedInStatus(status: boolean): void {
    this.isLoggedIn = status
  }
}
