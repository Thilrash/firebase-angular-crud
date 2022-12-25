import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private angularFireStore: AngularFirestore) { }

  // add student service
  addStudentService(student: Student) {
    student.id = this.angularFireStore.createId();
    return this.angularFireStore.collection('/Students').add(student);
  }

  // get all student service
  getAllStudentService() {
    return this.angularFireStore.collection('/Students').snapshotChanges();
  }

  // delete student service
  deleteStudentService(student: Student) {
    return this.angularFireStore.doc('/Students/' + student.id).delete();
  }

  // update student service
  updateStudentService(student: Student) {
    this.deleteStudentService(student);
    this.addStudentService(student);
    //return this.angularFireStore.doc('/Students' + student.id).update(student);
  }
}
