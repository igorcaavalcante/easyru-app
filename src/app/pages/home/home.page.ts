import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

    private user: { logged: boolean, data: any };
    public ready = false;
    public transactions = [];

    constructor(
        private menuCtrl: MenuController,
        private authService: AuthService,
        private transactionsService: TransactionsService
    ) { }

    async ngOnInit() {
        this.menuCtrl.enable(true);
        await this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
            this.ready = true;
        });
        this.transactions = (await this.transactionsService.get()).result;
        this.ready = true;
    }

    toggle() {
        this.menuCtrl.toggle();
    }

}