import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './models/shared.service';
import { UserInfo } from './models/userInfo';
import { Router } from '@angular/router';
import { Utility } from './utility/utility';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Health Buddy';
  viewportMobileQuery: MediaQueryList;
  selectedUser: UserInfo;
  subscriptions = new Subject();

  private _viewportQueryListener: () => void;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private http: HttpClient,
    private readonly shared: SharedService,
    private readonly router: Router
  ) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 768px)');
    this._viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this._viewportQueryListener);
  }
  ngOnInit() {
    this.consumeData();
    this.getSelectedUser();
  }
  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }
  consumeData() {
    this.http.get('https://vl8o2dlbvg.execute-api.us-east-2.amazonaws.com/dev/userinfo'
    ).pipe(takeUntil(this.subscriptions)).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.shared.setUserData(resp.Items);
      }
    })
  }
  getSelectedUser() {
    this.shared.getSelectedUser().pipe(takeUntil(this.subscriptions)).subscribe(resp => {
      this.selectedUser = resp;
    })
  }
  goToHome() {
    this.shared.setSelelectedUser(null);
    this.shared.setPhysicalActivityData(null);
    this.shared.setMedicalActivityData(null);
    this.selectedUser = undefined;
    this.router.navigate(['/']);
  }
}
