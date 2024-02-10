import { Component, OnInit, Input } from '@angular/core';
import { myFlixService } from '../fetch-api-data.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../shared-service/shared.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [DatePipe]
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  userId: string | null = null;
  user: any = {};
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  ]);
  username = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    public myflixService: myFlixService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  getUser(): void {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      this.user = JSON.parse(user);
      this.userId = this.user._id;
    }
  }

  updateUser(): void {
    if (this.userId) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('no token');
        return;
      }
      const updatedUser = this.mergeObjects(this.user, this.userData);

      this.myflixService.updateUser(this.userId, updatedUser).subscribe(
        (result: any) => {
          console.log('result from myflix updateuser', result);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.user = updatedUser;
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      console.log('User ID is null. Cannot update user.');
    }
  }

  deleteUser(): void {
    console.log('delete', this.userId);
    console.log('user', this.user.Username);
    if (this.userId) {
      const isUserSure = window.confirm('Are you sure you want to delete this user?');

      if (isUserSure) {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('no token');
          return;
        }
        const updatedUsername = this.userId;
        console.log('updatedUsername',updatedUsername);

        this.myflixService.deleteSingleUser(this.user.Username, this.userId).subscribe(
          (result: any) => {
            console.log('result from myflix deleteUser', result);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      } else {
        console.log('User ID is null. Cannot delete user.');
      }
    } else {
      console.log('User deletion canceled.');
    }
  }

  mergeObjects(target: any, source: any): any {
    const result = { ...target };
    for (const key in source) {
      if (source.hasOwnProperty(key) && source[key] !== '') {
        result[key] = source[key];
      }
    }
    return result;
  }

  getErrorMessage(control: FormControl, label: string): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    if (control.hasError('pattern')) {
      return 'Not a valid password';
    }
    if (control.hasError('minlength')) {
      return `${label} must be at least 5 characters long.`;
    }
    return '';
  }

  ngOnInit(): void {
    this.getUser();
  }
}
