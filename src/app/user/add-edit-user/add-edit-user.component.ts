import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  roles: string[] = ['Admin', 'Customer Executive'];
  addOrEdit: string;
  
  constructor(private service: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.service.editUser == true) {
      this.addOrEdit = "Edit User";
    }
    else {
      this.addOrEdit = "Add User";
    }

  }

  onSubmit() {
    console.log(this.service.editUser);

    if (this.service.editUser === true) {
      this.service.putData(this.service.user).subscribe(
        res => {
          console.log(res);
        }
      );
      this._snackBar.open("User Edited", "Close", {
        duration: 5000,
      });
    }
    else {
      this.service.postData(this.service.user).subscribe(
        res => {
          console.log(res);
        }
      );
      this._snackBar.open("User Added", "Close", {
        duration: 5000,
      });
    }
    this.service.clear();
    this.service.editUser = false;
  }

}
