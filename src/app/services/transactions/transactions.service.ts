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

    public debit(value: number, operator: string, cpf: string, hash: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.post(Api.url + `transactions/`, {
                type: "Output",
                value,
                operator,
                consumer_cpf: cpf,
                hash
            },
                { headers: Api.options })
                .subscribe(
                    (result) => {
                        resolve({ success: true, result });
                    },
                    (result) => {
                        resolve({ success: false, message: result.error.error });
                    },
                );
        });
    }

}
