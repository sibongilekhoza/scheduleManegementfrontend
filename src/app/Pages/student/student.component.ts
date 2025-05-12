import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestSenderService } from '../../Services/request-sender.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
 
  students: any;
  displayedColumns: string[] = ['studentno', 'email', 'names', 'surname', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _http: RequestSenderService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this._http.sendGet<any[]>("admin/students").subscribe(
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
}
