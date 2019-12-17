import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AuthService } from "src/app/services/auth/auth.service";
import { AlertController } from "@ionic/angular";
import { UtilsService } from "src/app/services/utils/utils.service";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-qrcode",
    templateUrl: "./qrcode.page.html",
    styleUrls: ["./qrcode.page.scss"],
})
export class QrcodePage implements OnInit {

    private user: { logged: boolean, data: any };
    private ready = false;
    private code: string;
    private alreadyScan = false;
    private hash: any;
    private quantity = null;
    private consumer = null;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private authService: AuthService,
        public alertController: AlertController,
        private utilsService: UtilsService,
        private transactionsService: TransactionsService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
        });
        this.code = this.authService.data.user_hash;
        this.ready = true;
    }

    scanCode() {
        this.barcodeScanner.scan().then(async barcodeData => {
            this.consumer = await this.utilsService.getUser(barcodeData.text);
            if (!this.consumer) {
                const errorAlert = await this.alertController.create({
                    header: "Usuário não encontrado",
                    buttons: ["OK"]
                });
                await errorAlert.present();
            } else {
                this.hash = barcodeData.text;
                this.alreadyScan = true;
            }
        });
    }

    async debit(meal: string) {
        if (!this.quantity) {
            const errorAlert = await this.alertController.create({
                header: "Informar a quantidade",
                buttons: ["OK"]
            });

            await errorAlert.present();
            return;
        }
        let value = 0;
        if (!this.consumer.has_studentship) {
            switch (meal) {
                case "lunch":
                    switch (this.consumer.type) {
                        case "Graduate": value = 3; break;
                        case "Post_Graduate": value = 5; break;
                        case "Teacher": value = 8; break;
                    }
                    break;
                case "dinner": value = 3; break;
                case "soup": value = 1; break;
            }
        }
        const total = this.quantity * value;
        if (this.consumer.credit >= total) {
            const response = await this.transactionsService.debit(
                total,
                `${this.authService.data.first_name} ${this.authService.data.last_name}`,
                this.consumer.user.username,
                this.hash,
            );
            const message = (response.success) ? "Salvo com sucesso!" : "Erro ao salvar";
            const alert = await this.alertController.create({
                header: message,
                buttons: ["OK"]
            });
            await alert.present();
            if (response.success) {
                this.router.navigate(["home"]);
            }
        } else {
            const errorAlert = await this.alertController.create({
                header: "Saldo insuficiente!",
                buttons: ["OK"]
            });
            await errorAlert.present();
        }
    }

}
