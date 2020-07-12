import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  code: string;
  name: string;
  email: string;
  tel: string;
  line_id: string;
  address: string;
  _id: string;

  customer: [];

  constructor(
    private http: HttpClient,
    private shareService: ShareService
    ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.get(this.shareService.serverPath + '/customerAll').subscribe((res: any) => {
      this.customer = res
    })
  }

  save(){
    if(confirm("ยืนยันการบันทึก")){
      var params = {
        code: this.code,
        name: this.name,
        email: this.email,
        tel: this.tel,
        line_id: this.line_id,
        address: this.address,
        _id: null
      }

      var path = this.shareService.serverPath +'/customerSave';
      
      if(this._id != null) {
        path = this.shareService.serverPath +'/customerUpdate';
        params._id = this._id;
      }
      this.http.post(path, params).subscribe((res: any) => {
        alert("Save success");
        this.loadData()
        this._id = null
      });
    }
  }

  customerDelete(item){
    if(confirm("ยืนยันการลบ ?")){
      var params = {
        _id: item._id
      }
      var path = this.shareService.serverPath +'/customerDelete';
      this.http.post(path, params).subscribe((res: any) => {
        alert("ลบรายการแล้ว")
        this.loadData()
      })
    }
  }

  customerInfo(item){
    this.code = item.code,
    this.name = item.name,
    this.email = item.email,
    this.tel = item.tel,
    this.address = item.address,
    this.line_id = item.line_id,
    this._id = item._id
  }

}
