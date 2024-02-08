import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { SharedService } from './shared-service/shared.service'
import { Router } from '@angular/router' // Remove the extra closing curly brace here

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client'
  isLoggedIn: boolean = false
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  logout(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.router.navigate(['/welcome'])
  }
  ngOnInit(): void {
    this.sharedService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
      this.cdr.detectChanges()
      console.log('isLoggedIn app - user is logged in', this.isLoggedIn)
    })
  }
}
