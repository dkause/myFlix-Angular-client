import { Component, OnInit } from '@angular/core'
import { SharedService } from './shared-service/shared.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myFlix-Angular-client'
  isLoggedIn: boolean = false
constructor(private sharedService: SharedService){}
  ngOnInit() {
   const isLoggedIn = this.sharedService.isUserLoggedIn()
   console.log('user is logged in', isLoggedIn) 
   this.isLoggedIn = isLoggedIn
  }
}
