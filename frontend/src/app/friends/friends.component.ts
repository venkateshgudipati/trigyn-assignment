import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FriendService } from '../services';

@Component({
  selector: 'room-share-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public lstUsers: any;
  public userForm: FormGroup;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private userService: FriendService) { }

  ngOnInit() {
    this.loadUsers();
    this.buildForm();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      res => this.lstUsers = res,
      err => console.log(err)
    )
  }

  buildForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value)
        .subscribe(
          res => this.loadUsers(),
          err => console.log(err),
          () => this.userForm.reset()
        );
    }
    this.closeBtn.nativeElement.click();
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure want to delete?')) {
      this.userService.deleteUser(userId)
        .subscribe(
          res => this.loadUsers(),
          err => console.log(err)
        );
    }
  }
}
