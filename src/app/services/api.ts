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
            headers.authorization = `token ${JSON.parse(localStorage.getItem("token"))}`;
        }

        return new HttpHeaders(headers);
    }

    public static get url(): string {
        return "https://easyru-backend.herokuapp.com/api/";
    }
}
