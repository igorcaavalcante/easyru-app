import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-qrcode",
    templateUrl: "./qrcode.page.html",
    styleUrls: ["./qrcode.page.scss"],
})
export class QrcodePage implements OnInit {

    private user: { logged: boolean, data: any };
    public ready = false;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
            this.ready = true;
        });
    }

}
