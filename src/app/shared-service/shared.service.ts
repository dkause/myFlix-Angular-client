// shared.service.ts
import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private favoriteAddedSource = new Subject<void>()

  // Observable to subscribe to favorite added events
  favoriteAdded$ = this.favoriteAddedSource.asObservable()

  // Method to trigger a favorite added event
  triggerFavoriteAdded(): void {
    this.favoriteAddedSource.next()
  }
}
