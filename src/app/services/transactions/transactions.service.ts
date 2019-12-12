import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api, DefaultResponse } from '../api';

@Injectable({
  providedIn: "root"
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

    public get(): Promise<DefaultResponse> {
        return new Promise((resolve) => {
            this.http.get(`${Api.url}transactions/`, { headers: Api.options }).subscribe(
                (result) => {
                    resolve({ success: true, result });
                },
                (error) => {
                    resolve({ error });
                },
            );
        });
    }
  
}
