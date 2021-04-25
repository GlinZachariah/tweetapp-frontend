import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input("user")
  userData: any;

  user: any;

  constructor() {
    this.user = {
      firstName: "glin",
      lastName: "zachariah",
      email: "glinzac@gmail.com",
      userId: "glinzachariah",
      contactNumber: 123456789
    }
  }

  ngOnInit(): void {
  }

}
