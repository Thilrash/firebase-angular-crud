import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  logout() {
    this.auth.logout();
  }

  // reset the form
  resetForm() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobile = '';
  }

  // get all students
  getAllStudents() {
    this.data.getAllStudentService().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching student data');
    });
  }

  // add student
  addStudent() {
    if (this.firstName == '' || this.lastName == '' || this.mobile == '' || this.email == '') {
      alert('Please fill the missing text fields');
      return;
    }

    this.studentObj.id = '';
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;

    this.data.addStudentService(this.studentObj);
    this.resetForm();
  }

  // update student
  updateStudent() { }

  // delete student
  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + '?')) {
      this.data.deleteStudentService(student);
    }
  }
}
