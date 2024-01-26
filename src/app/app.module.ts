import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
// Routing
import { RouterModule, Routes } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// API for server/API communictation
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// Material Design
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list'
import {LayoutModule} from '@angular/cdk/layout';

// myFLixComponents
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'
import { MovieCardComponent } from './movie-card/movie-card.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'
import { GenreModalComponent } from './genre-modal/genre-modal.component'
import { DirectorModalComponent } from './director-modal/director-modal.component'
import { MovieDetailModalComponent } from './movie-detail-modal/movie-detail-modal.component';
import { ProfilePageComponent } from './profile-page/profile-page.component'

// Defining the routes
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenreModalComponent,
    DirectorModalComponent,
    MovieDetailModalComponent,
    ProfilePageComponent,
  ],
  imports: [
    LayoutModule,
    MatGridListModule,
    MatIconModule,
    RouterModule.forChild(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
