import { Injectable } from "@angular/core";
import { Api } from "../api";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    public logged = false;
    public data: any;
    public token: string;

    public user: Subject<{ logged: boolean, data: any, token: string }> = new Subject();

    constructor(private http: HttpClient) {
        this.updateUserData();
    }

    public isAuthenticated(): boolean {
        return this.logged;
    }

    public async updateUserData(): Promise<void> {
        this.logged = localStorage.getItem("logged") === "true" ? true : false;
        console.log("logado: " + this.logged);
        this.data = this.logged ? await this.getMe() : false;
        console.log("data: ");
        console.log(this.data);
        this.token = localStorage.getItem("token");
        this.user.next({ logged: this.logged, data: this.data, token: this.token });
    }

    public login(cpf: string, password: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.post(Api.url + `auth/`, { username: cpf, password }, { headers: Api.options })
                .subscribe(
                    (result: any) => {
                        localStorage.setItem("logged", "true");
                        localStorage.setItem("token", JSON.stringify(result.token));
                        this.updateUserData();
                        resolve(true);
                    },
                    (result) => {
                        resolve({ success: false, message: result.error.error });
                    },
                );
        });
    }

    public logout(): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem("logged", "false");
            localStorage.setItem("token", null);
            this.updateUserData();
            resolve(true);
        });
    }

    private getMe(): Promise<any> {
        return new Promise((resolve) => {
            console.log(Api.url + `consumer/home/`);
            this.http.get(Api.url + `consumer/home/`, { headers: Api.options })
                .subscribe(
                    (data) => {
                        if (data) {
                            resolve(data);
                            return;
                        }

                        resolve(null);
                    },
                    (error) => {
                        if (error.status === 404) {
                            this.logout();
                        }
                        resolve(null);
                    },
                );
        });
    }

}
