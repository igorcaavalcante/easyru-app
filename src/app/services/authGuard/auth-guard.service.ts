import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService) { }

    async canActivate() {
        return await this.authService.isAuthenticated();
    }
}
