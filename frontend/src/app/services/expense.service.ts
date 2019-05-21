import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class ExpenseService {

    constructor(private http: HttpClient) {

    }

    getExpenses() {
        return this.http.get('/expenses');
    }

    saveExpense(model){
        return this.http.post('/expenses',model);
    }

    deleteExpense(expenseId){
        return this.http.delete(`/expenses/${expenseId}`);
    }
}