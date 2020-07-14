import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

declare function closeModal(): any;

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css'],
})
export class RepairComponent implements OnInit {
  customers: any;
  customer = {
    name: null,
    code: null,
    _id: null,
  };

  pets: any;
  pet = {
    name: null,
    _id: null,
  };

  repairs: any;
  repair = {
    problem: null,
    price: null,
    remark: null,
  };

  mediceens: any;

  repairMediceen = {
    _id: null,
    qty: null,
    remark: null,
    mediceen_id: null,
    repair_id: null,
  };

  historys: any;

  constructor(private http: HttpClient, private shareService: ShareService) {}

  ngOnInit(): void {}

  chooseCustomer(customer) {
    this.customer = customer;
    this.loadPet();
  }

  loadCustomers() {
    this.http
      .get(this.shareService.serverPath + '/customerAll')
      .subscribe((res: any) => {
        this.customers = res;
      });
  }

  loadPet() {
    this.http
      .post(this.shareService.serverPath + '/petOfCustomer', this.customer)
      .subscribe((res: any) => {
        this.pets = res;
      });
  }

  choosePet(item) {
    this.pet = item;
    this.loadRepairOfPet();
  }

  saveRepair() {
    var params = {
      repair: this.repair,
      pet: this.pet,
    }

    if (
      this.repair.problem != undefined &&
      this.pet.name != undefined &&
      this.customer.name != undefined &&
      this.repair.price != undefined &&
      this.repair.remark != undefined
    ) {
      this.http
        .post(this.shareService.serverPath + '/repairSave', params)
        .subscribe((res: any) => {
          alert('บันทึกเสร็จเรียบร้อย');
          this.loadRepairOfPet();
          this.repair = {
            problem: null,
            price: null,
            remark: null,
          };
        });
    } else {
      alert('กรุณาใส่ข้อมูลให้ครบ');
    }
  }

  loadRepairOfPet() {
    var params = {
      pet_id: this.pet._id,
    };
    this.http
      .post(this.shareService.serverPath + '/repairOfPet', params)
      .subscribe((res: any) => {
        this.repairs = res;
      });
  }

  removeRepair(item) {
    if (confirm('ยืนยันการลบ ?')) {
      this.http
        .post(this.shareService.serverPath + '/repairRemove', item)
        .subscribe((res: any) => {
          alert('ลบเรียบร้อย');
          this.loadRepairOfPet();
        });
    }
  }

  editRepair(item) {
    this.repair = item;
  }

  modalMediceen(item) {
    this.repairMediceen.repair_id = item._id;
    this.http
      .get(this.shareService.serverPath + '/mediceenAll', item)
      .subscribe((res: any) => {
        this.mediceens = res;
      });
  }

  saveRepairMediceen() {
    if (confirm('save repair mediceen')) {
      this.http
        .post(
          this.shareService.serverPath + '/repairMediceenSave',
          this.repairMediceen
        )
        .subscribe((res: any) => {
          closeModal();
        });
    }
  }

  chooseMediceen(item) {
    this.repairMediceen.mediceen_id = item._id;
    this.repairMediceen.qty = null;
    this.repairMediceen.remark = null;
  }

  modalHistory(item) {
    this.http
      .post(this.shareService.serverPath + '/history', item)
      .subscribe((res: any) => {
        this.historys = res;
      });
  }

  editHistory(item) {
    this.repairMediceen = item;
  }

  removeHistory(item) {
    if (confirm('ยืนยันการลบ ?')) {
      this.http
        .post(this.shareService.serverPath + '/removeHistory', item)
        .subscribe((res: any) => {
          alert('ลบเรียบร้อย');
          var netItem = {
            _id: item.repair_id,
          };
          this.modalHistory(netItem);
        });
    }
  }
}
