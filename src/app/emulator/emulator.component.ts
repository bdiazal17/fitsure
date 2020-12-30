import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../models/shared.service';

@Component({
  selector: 'app-emulator',
  templateUrl: './emulator.component.html',
  styleUrls: ['./emulator.component.scss']
})
export class EmulatorComponent implements OnInit {

  compareForm: FormGroup;
  userId: string;
  constructor(
    private readonly shared: SharedService,
    private readonly http: HttpClient
  ) { }

  ngOnInit() {
    this.compareForm = new FormGroup({
      heartRate: new FormControl(),
      oxySaturation: new FormControl(),
      bloodPrLow: new FormControl(),
      bloodPrHigh: new FormControl()
    });
    this.shared.getSelectedUser().subscribe(user => {
      if (user) {
        this.userId = user.userid;
      }
    })
  }
  onSubmit() {
    const heartRate = this.compareForm.get('heartRate').value;
    const oxySaturation = this.compareForm.get('oxySaturation').value;
    const bloodPrLow = this.compareForm.get('bloodPrLow').value;
    const bloodPrHigh = this.compareForm.get('bloodPrHigh').value;
    const data = this.getPredefinedData();
    data.payload.Item.userid = this.userId;
    data.payload.Item.heartrate = heartRate;
    data.payload.Item.oxysaturation = oxySaturation;
    data.payload.Item.bloodpressurelow = bloodPrLow;
    data.payload.Item.bloodpressurehigh = bloodPrHigh;
    this.http.post('https://vl8o2dlbvg.execute-api.us-east-2.amazonaws.com/dev/healthparams', data).subscribe();
    console.log(data);
  }
  getPredefinedData() {
    return {
      "operation": "create",
      "tableName": "health-parameters",
      "payload": {
        "Item": {
          "id": "18",
          "userid": "XYZ1238",
          "bloodpressurehigh": "120",
          "bloodpressurelow": "80",
          "heartrate": "75",
          "oxysaturation": "75",
          "sleep": "8",
          "step": "10000"
        }
      }
    };
  }
}
