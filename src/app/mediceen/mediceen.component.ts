import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-mediceen',
  templateUrl: './mediceen.component.html',
  styleUrls: ['./mediceen.component.css']
})
export class MediceenComponent implements OnInit {

  mediceens: any
  mediceen = {
    code: null,
    name: null,
    buy: null,
    sale: null,
    remark: null,
    _id: null
  }

  constructor(private http: HttpClient, private shareService: ShareService) { }

  ngOnInit(): void {
    this.loadMediceen()
  }

  clearMeidceen(){
    this.mediceen = {
      code: null,
      name: null,
      buy: null,
      sale: null,
      remark: null,
      _id: null
    }
  }

  save(){
    this.http.post(this.shareService.serverPath + '/saveMediceen', this.mediceen).subscribe((res: any) => {
      alert("บันทึกรายการแล้ว")
      this.clearMeidceen()
      this.loadMediceen()
    })
  }

  loadMediceen(){
    this.http.get(this.shareService.serverPath + '/mediceenAll').subscribe((res: any) =>{
      this.mediceens = res
    })
  }

  mediceenDelete(item){
    if (confirm("ยืนยันการลบ ?")){
      this.http.post(this.shareService.serverPath + '/mediceenDelete', item).subscribe((res: any) =>{
        alert("ลบรายการแล้ว")
        this.loadMediceen()
      })
    }
  }

  editMediceen(item){
    this.mediceen = {
      code: item.code,
      name: item.name,
      buy: item.buy,
      sale: item.sale,
      remark: item.remark,
      _id: item._id,
    }

    console.log(this.mediceen._id)
  }

}
