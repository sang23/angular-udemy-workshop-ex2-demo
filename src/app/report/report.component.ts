import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  search = {
    from: null,
    to: null,
  }

  repairs: any
  totalPrice: Number = 0

  constructor(private http: HttpClient, private shareService: ShareService) { }

  ngOnInit(): void {
  }

  shopReport(){
    this.totalPrice = 0
    this.http.post(this.shareService.serverPath + '/reportAll', this.search).subscribe((res: any) =>{
      this.repairs = res

      for(var i = 0; i < res.length; i++){
        this.totalPrice += res[i].price
      }
    })
  }

}
