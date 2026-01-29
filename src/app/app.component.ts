import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeform!: FormGroup;
  employeeobj: EmployeeModel = new EmployeeModel();
  employelist: EmployeeModel[] = []

  constructor() {
    debugger
    this.createForm()
    const olddata = localStorage.getItem('empdata');
    if (olddata != null) {
      const parsData = JSON.parse(olddata);
      this.employelist = parsData

    }
  }

  createForm() {
    this.employeeform = new FormGroup({
      empId: new FormControl(this.employeeobj.empId),
      name: new FormControl(this.employeeobj.name, [Validators.required]),
      city: new FormControl(this.employeeobj.city),
      state: new FormControl(this.employeeobj.state),
      emailId: new FormControl(this.employeeobj.emailId),
      contactNo: new FormControl(this.employeeobj.contactNo),
      address: new FormControl(this.employeeobj.address),
      pincode: new FormControl(this.employeeobj.pincode, [Validators.required, Validators.minLength(6)]),

    })
  }
  Reset() {
    this.employeeobj = new EmployeeModel();
    this.createForm();
  }

  onEdit(item: EmployeeModel) {
    this.employeeobj = item
    this.createForm()
  }

  ondelete(id: number) {
    const isdelete = confirm('Are you sure Want to Delete')
    if (isdelete) {
      const index = this.employelist.findIndex(m => m.empId == id);
      this.employelist.splice(index, 1);
      localStorage.setItem('empdata', (JSON.stringify(this.employelist)));
    }

  }

  onupdate() {
    const record = this.employelist.find(m => m.empId == this.employeeform.controls['empId'].value);
    if (record != undefined) {
      record.address = this.employeeform.controls['address'].value;
      record.name = this.employeeform.controls['name'].value;
      record.city = this.employeeform.controls['city'].value;
      record.state = this.employeeform.controls['state'].value;
      record.emailId = this.employeeform.controls['emailId'].value;
      record.contactNo = this.employeeform.controls['contactNo'].value;
      record.pincode = this.employeeform.controls['contactNo'].value;


    }
    localStorage.setItem('empdata', (JSON.stringify(this.employelist)))
    this.Reset()
  }

  onSave() {
    alert('test')
    debugger
    const olddata = localStorage.getItem('empdata');
    if (olddata != null) {
      const parseData = JSON.parse(olddata);
      this.employeeform.controls['empId'].setValue(parseData.length + 1);
      this.employelist.unshift(this.employeeform.value);

    }
    else {
      this.employelist.unshift(this.employeeform.value);
      localStorage.setItem('empdata', (JSON.stringify(this.employelist)))

    }

    localStorage.setItem('empdata', (JSON.stringify(this.employelist)))

  }



}
