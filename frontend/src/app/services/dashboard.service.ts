import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class DashboardService {

    constructor(private http: HttpClient) {

    }

    getReport(){
        return this.http.get('/report');
    }
    getsummaryExpenses(){
        return this.http.get('/expenseSummary');
    }
}