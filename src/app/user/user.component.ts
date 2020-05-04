import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './shared/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatSort } from '@angular/material';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['userName', 'userEmail', 'userRole', 'userStatus', 'edit', 'delete'];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.service.getData().subscribe((data: any[]) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
    })
  }

  editUser(user: Object) {
    this.service.editUser = true;
    this.service.update(user);
    this.onCreate();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRef = this.dialog.open(AddEditUserComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(() => {
      this.service.clear();
      this.service.editUser = false;
    });
  }

  deleteUser(userId: string) {
    this.service.deleteData(userId).subscribe(
      res => {
        console.log(res);
      }
    );
    this.dialogRef.close();
    this._snackBar.open("User Deleted", "Close", {
      duration: 5000,
    });
  }

  constructor(private service: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddEditUserComponent>) { }

}
