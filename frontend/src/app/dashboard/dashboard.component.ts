import { Component, OnInit } from '@angular/core';
import { DashboardService, FriendService } from '../services'
import { totalmem } from 'os';
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
  public owesSummary = [];
  constructor(
    private dashService: DashboardService,
    private userService: FriendService) { }

  ngOnInit() {
    this.loadReport();
  }
  /// get summery of total expenses and user count
  loadReport() {
    this.dashService.getReport()
      .subscribe(
        res => { this.report = res; this.loadUsers(); },
        err => console.log(err)
      );
  }

  /// get avaiable users in the system
  loadUsers() {
    this.userService.getUsers()
      .subscribe(
        res => { this.lstUsers = res; this.loadSummary(); },
        err => console.log(err)
      );
  }

  /// get summary of expenses amount group by user
  loadSummary() {
    this.dashService.getsummaryExpenses()
      .subscribe(
        res => { this.expenseSummary = res; this.calculateAvg(); },
        err => console.log(err)
      );
  }
  /// calculating  avg values per person
  calculateAvg() {
    if (this.report.userCount > 0) {
      this.avgPerUser = this.report.totalExpenses / this.report.userCount;
    } else {
      this.avgPerUser = 0;
    }
    this.splitPayments();
  }

/// split payments and generate owes summary
  splitPayments() {
    let allUsers = [];

    for (const user of this.lstUsers) {
      allUsers.push({
        id: user._id,
        name: user.name,
        amount: 0
      });
    }
    for (const payedUser of this.expenseSummary) {
      let userFound = allUsers.filter(c => c.id === payedUser._id);
      if (userFound) {
        userFound[0].amount = payedUser.total;
      }
    }

    const sortedPeople = allUsers.sort((personA, personB) => personA.amount - personB.amount);
    const sortedValuesPaid = sortedPeople.map((person) => person.amount - this.avgPerUser);

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      this.owesSummary.push((`${sortedPeople[i].name} owes ${sortedPeople[j].name} ${debt}`));

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }


  }
}
