import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestSenderService } from '../../Services/request-sender.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.css'
})
export class StuffComponent {

  students: any;
  displayedColumns: string[] = ['staffno', 'email', 'names', 'surname', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _http: RequestSenderService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this._http.sendGet<any[]>("admin/all-lecturers").subscribe(
      (response) => {
        console.log(response.body);
        this.students = response.body || [];
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(e:any) {
    let filterValue =e.target.value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:any,name:any){
    Swal.fire({
      title: "Are you sure u wanna Delete Staff : "+name.name + " "+name.surname,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.deleteItem<void>("admin/lectureDelete", id).subscribe(() => {
          console.log('Item deleted successfully');
            Swal.fire({
          title: "Deleted!",
          text: "Staff Record has been deleted.",
          icon: "success"
        });
        this.loadStudents()
        }, error => {
          console.error('Error deleting item:', error);
        });
      
      }
    });

 
  }
}
