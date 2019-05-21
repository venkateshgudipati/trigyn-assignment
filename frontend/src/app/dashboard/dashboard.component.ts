import { Component, OnInit } from '@angular/core';
import { DashboardService, FriendService } from '../services'
@Component({
  selector: 'room-share-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public report: any = {
    totalExpenses: 0,
    userCount: 0
  };
  public lstUsers: any;
  public avgPerUser: any;
  public expenseSummary: any;
  constructor(
    private dashService: DashboardService,
    private userService: FriendService) { }

  ngOnInit() {
    this.loadReport();
    this.loadUsers();
    this.loadSummary();
  }
  loadReport() {
    this.dashService.getReport()
      .subscribe(
        res => { this.report = res; this.calculateAvg(); },
        err => console.log(err)
      );
  }
  loadUsers() {
    this.userService.getUsers()
      .subscribe(
        res => this.lstUsers = res,
        err => console.log(err)
      );
  }
  loadSummary() {
    this.dashService.getsummaryExpenses()
      .subscribe(
        res => this.expenseSummary = res,
        err => console.log(err)
      );
  }
  calculateAvg() {
    if (this.report.userCount > 0) {
      this.avgPerUser = this.report.totalExpenses / this.report.userCount;
    } else {
      this.avgPerUser = 0;
    }
  }

  render(user: any) {
    let expense = this.expenseSummary.filter(c => c._id == user._id);
    if (expense) {
      let remaining = 0;
      let spendamount = expense[0].total;
      if (this.avgPerUser > spendamount) {
        remaining = this.avgPerUser - spendamount;
        return `${user.name} owes amount ${remaining} to others`
      } else if (this.avgPerUser < spendamount) {
        remaining = spendamount - this.avgPerUser;
        return `${user.name} gets amount ${remaining} from others`
      }else{
        return `${user.name} no need to settle with others`
      }
    }
    return user.name;
  }
}
