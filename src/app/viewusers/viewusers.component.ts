import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  userNameList: string[];
  userSelected: boolean = false;
  selectedUser: string;
  constructor() {
    this.userNameList = ["jim", "james", "gordon", "thomas"]
  }

  ngOnInit(): void {
  }

  selectUser(user: string) {
    if (user != null && user == this.selectedUser && this.userSelected == true) {
      this.userSelected = false;
    } else {
      this.userSelected = !this.userSelected;
      this.selectedUser = user;
    }

  }

}
