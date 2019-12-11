import { HttpHeaders } from "@angular/common/http";

export interface DefaultResponse {
    success?: boolean;
    result?: any;
    error?: any;
}

export class Api {

    public static get options(): HttpHeaders {

        const headers: any = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
            "Accept": "application/json",
        };

        const logged = localStorage.getItem("logged") === "true" ? true : false;


        if (logged) {
            headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
        }

        return new HttpHeaders(headers);
    }

    public static get url(): string {
        return "http://127.0.0.1:8000/api/";
    }
}
