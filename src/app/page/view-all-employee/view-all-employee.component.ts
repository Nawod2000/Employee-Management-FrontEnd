import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from '../../comman/nav/nav.component';

@Component({
  selector: 'app-view-all-employee',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NavComponent],
  templateUrl: './view-all-employee.component.html',
  styleUrl: './view-all-employee.component.css'
})
export class ViewAllEmployeeComponent {

  public employeeList: any;

  

  constructor(private http: HttpClient) {
    this.loadAllEmployeeTable();
  }


  loadAllEmployeeTable() {
    this.http.get("http://localhost:8080/emp-controller/get-all").subscribe(res => {
      this.employeeList = res;
      console.log(res);
    })
  }

  deleteEmployee(employee: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`http://localhost:8080/emp-controller/delete-emp/${employee.id}`, { responseType: 'text' }).subscribe(res => {
          this.loadAllEmployeeTable();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          console.log(res);
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

  }

  public selectedEmployee: any= {
    "id": null,
    "firstName": null,
    "lastName": null,
    "email": null,
    "department": null,
    "role": null
  }

  updateEmployee(employee: any) {
      this.selectedEmployee=employee;

      if(employee != null){
        this.selectedEmployee=employee;
      }
      
      console.log(employee);   
  }

  saveUpdateEmployee(){
    this.http.post("http://localhost:8080/emp-controller/update-emp",this.selectedEmployee).subscribe(res =>{
      console.log("update");
      
    })
  }
}
