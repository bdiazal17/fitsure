import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly _UserData: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
  private readonly _selectedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly _physicalActivityData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly _medicalActivityData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  getUserData() {
    return this._UserData.asObservable();
  }
  setUserData(val: any) {
    this._UserData.next(val);
  }
  getSelectedUser() {
    return this._selectedUser.asObservable();
  }
  setSelelectedUser(val: any) {
    this._selectedUser.next(val);
  }
  getPhysicalActivityData() {
    return this._physicalActivityData.asObservable();
  }
  setPhysicalActivityData(val: any) {
    this._physicalActivityData.next(val);
  }
  getMedicalActivityData() {
    return this._medicalActivityData.asObservable();
  }
  setMedicalActivityData(val: any) {
    this._medicalActivityData.next(val);
  }
}
