import { Injectable } from "@angular/core";
import * as cpfTool from "cpf";

@Injectable({
    providedIn: "root"
})
export class UtilsService {

    constructor() { }

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

}
