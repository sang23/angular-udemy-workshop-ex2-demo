import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  customers: any
  customer = {
    name: null,
    code: null,
    _id: null
  }

  pets: any
  pet = {
    name: null,
    _id: null
  }

  repairs: any
  repair = {
    problem: null,
  }

  mediceens: any

  constructor(
    private http: HttpClient,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
  }

  chooseCustomer(customer){
    this.customer = customer
    this.loadPet()
  }

  loadCustomers(){
    this.http.get(this.shareService.serverPath + '/customerAll').subscribe((res: any) => {
      this.customers = res
    })
  }

  loadPet(){
    this.http.post(this.shareService.serverPath + '/petOfCustomer', this.customer).subscribe((res: any) => {
      this.pets = res
    })
  }

  choosePet(item){
    this.pet = item
    this.loadRepairOfPet()
  }

  saveRepair(){
    var params = {
      repair: this.repair,
      pet: this.pet
    }

    this.http.post(this.shareService.serverPath + '/repairSave', params).subscribe((res: any) =>{
      alert("บันทึกเสร็จเรียบร้อย")
      this.loadRepairOfPet()
      this.repair = {
        problem: null,
      }
    });
  }

  loadRepairOfPet(){
    var params = {
      pet_id: this.pet._id
    }
    this.http.post(this.shareService.serverPath + '/repairOfPet', params).subscribe((res: any) => {
      this.repairs = res
    })
  }

  removeRepair(item){
    if(confirm("ยืนยันการลบ ?")){
      this.http.post(this.shareService.serverPath + '/repairRemove', item).subscribe((res: any) => {
        alert("ลบเรียบร้อย")
        this.loadRepairOfPet()
      })
    }
  }

  editRepair(item){
    this.repair = item
  }

  modalMediceen(item){
    this.http.get(this.shareService.serverPath + "/mediceenAll", item).subscribe((res: any) =>{
      this.mediceens = res
    })
  }

}
