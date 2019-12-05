import { HttpHeaders } from "@angular/common/http";

export interface DefaultResponse {
    success?: boolean;
    result?: any;
    error?: any;
}

export class Api {

    public static get options(): HttpHeaders {

        const headers: any = { "Content-Type": "application/json" };

        const logged = localStorage.getItem("logged") === "true" ? true : false;


        if (logged) {
            headers.authorization = `Bearer ${this.token}`;
        }

        return new HttpHeaders(headers);
    }

    public static get token(): string {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.token;
    }

    public static get url(): string {
        return "https://clube-de-vantagens.herokuapp.com/";
    }
}
