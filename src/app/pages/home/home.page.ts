import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

    private user: { logged: boolean, data: any };
    public ready = false;

    constructor(
        private menuCtrl: MenuController,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.menuCtrl.enable(true);
        this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
            this.ready = true;
        });
    }

    toggle() {
        this.menuCtrl.toggle();
    }

}
