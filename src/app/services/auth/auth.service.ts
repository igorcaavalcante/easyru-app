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
    public auth: any;

    public user: Subject<{ logged: boolean, data: any, auth: any }> = new Subject();

    constructor(private http: HttpClient) {
        this.updateUserData();
    }

    public isAuthenticated(): boolean {
        return this.logged;
    }

    public async updateUserData(): Promise<void> {
        this.logged = localStorage.getItem("logged") === "true" ? true : false;
        this.data = this.logged ? await this.getMe() : false;
        this.auth = localStorage.getItem("auth");
        this.user.next({ logged: this.logged, data: this.data, auth: this.auth });
    }

    public login(cpf: string, password: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.post(Api.url + `consumer/${cpf}`, { cpf, password }/*, { headers: Api.options }*/)
                .subscribe(
                    (result) => {
                        localStorage.setItem("logged", "true");
                        localStorage.setItem("auth", JSON.stringify(result));
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
            localStorage.setItem("auth", null);
            this.updateUserData();
            resolve(true);
        });
    }

    private getMe(): Promise<any> {
        return new Promise((resolve) => {
            this.http.get(Api.url + `consumer/${this.data.cpf}`/*, { headers: Api.options }*/)
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

    public register(user: any): Promise<any> {
        return new Promise((resolve) => {
            this.http.post(Api.url + "users", { user }, { headers: Api.options })
                .subscribe(
                    async () => {
                        await this.login(user.cpf, user.password);
                        resolve(true);
                    },
                    (result) => {
                        resolve({ success: false, message: result.error.error });
                    },
                );
        });
    }

    public refreshAuth(): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.post(
                Api.url + "users/refresh",
                { refresh: JSON.parse(this.auth).refresh },
                { headers: Api.options },
            )
                .subscribe(
                    (result) => {
                        localStorage.setItem("logged", "true");
                        localStorage.setItem("auth", JSON.stringify(result));
                        this.updateUserData();
                        resolve(true);
                    },
                    (error) => {
                        if (error.status === 400 || error.status === 401 || error.status === 404) {
                            this.logout();
                        }
                        resolve(false);
                    },
                );
        });
    }

}
