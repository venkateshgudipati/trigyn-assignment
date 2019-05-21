import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FriendService, ExpenseService } from '../services'
@Component({
  selector: 'room-share-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public lstUsers: any;
  public lstExpenses: any;
  public expenseFrom: FormGroup;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private userService: FriendService, private expenseService: ExpenseService) { }

  ngOnInit() {
    this.loadUsers();
    this.buidForm();
    this.loadExpenses();
  }

  loadUsers() {
    this.userService.getUsers()
      .subscribe(
        res => this.lstUsers = res,
        err => console.log(err)
      );
  }

  loadExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
        res => this.lstExpenses = res,
        err => console.log(err)
      );
  }

  buidForm() {
    this.expenseFrom = new FormGroup({
      userId: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  saveExpense() {
    if (this.expenseFrom.valid) {
      this.expenseService.saveExpense(this.expenseFrom.value)
        .subscribe(
          res => this.loadExpenses(),
          err => console.log(err),
          () => this.expenseFrom.reset()
        );
    }
    this.closeBtn.nativeElement.click();
  }
  deleteExpense(expenseId: string) {
    if (confirm('Are you sure want to delete?')) {
      this.expenseService.deleteExpense(expenseId)
        .subscribe(
          res => this.loadExpenses(),
          err => console.log(err)
        );
    }
  }
}
