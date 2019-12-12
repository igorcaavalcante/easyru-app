import { Injectable } from "@angular/core";
import * as cpfTool from "cpf";
import { Api } from "../api";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class UtilsService {

    constructor(private http: HttpClient) { }

    public isCpf(cpf: string): boolean {
        return cpfTool.isValid(cpf);
    }

    public checkUserType(userType: string): boolean {
        return true; ////////// TODO
    }

    public isEmail(email: string): boolean {
        // tslint:disable-next-line: max-line-length
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regex.test(email)) {
            return false;
        }
        return true;
    }

    public isPassword(password: string): boolean {
        if (password.length < 4) {
            return false;
        }
        return true;
    }

    public getUser(hash) {
        return new Promise((resolve) => {
            this.http.get(Api.url + `user/${hash}/`, { headers: Api.options })
                .subscribe(
                    (data) => {
                        if (data) {
                            resolve(data);
                            return;
                        }
                        resolve(null);
                    },
                    (error) => {
                        resolve(null);
                    },
                );
        });
    }

}
