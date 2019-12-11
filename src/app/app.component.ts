import { Component, OnInit } from "@angular/core";

import { Platform, LoadingController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {

    public appPages = [
        {
            title: "Home",
            url: "/home",
            icon: "home"
        },
    ];

    private user: any;
    private refreshCheck: any;

    constructor(
        private platform: Platform,
        private loadingController: LoadingController,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    public async ngOnInit() {

        const loading = await this.loadingController.create();
        loading.present();

        this.authService.updateUserData();

        this.authService.user.subscribe(async (user) => {

            this.user = user;

            if (!this.user.logged) {
                this.router.navigate(["login"]);
            }

        });

        this.authService.updateUserData();

        loading.dismiss();
    }
}
