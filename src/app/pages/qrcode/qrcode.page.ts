import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AuthService } from "src/app/services/auth/auth.service";
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

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
    private quantity = null;
    private consumer = null;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private authService: AuthService,
        public alertController: AlertController,
        private utilsService: UtilsService,
        private transactionsService: TransactionsService
    ) { }

    async ngOnInit() {
        this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
        });
        this.code = await this.authService.data.user_hash;
        this.ready = true;
    }

    scanCode() {
        this.barcodeScanner.scan().then(async barcodeData => {
            this.consumer = this.utilsService.getUser(barcodeData);
            if (!this.consumer) {
                const errorAlert = await this.alertController.create({
                    header: "Usuário não encontrado",
                    buttons: ["OK"]
                });
                await errorAlert.present();
            } else {
                this.alreadyScan = true;
            }
        });
    }

    async debit(meal: string) {
        if(this.quantity) {
            let value = 0;
            if (!this.consumer.has_studentship) {
                switch(meal) {
                    case "lunch": 
                        switch(this.authService.data.type){
                           case "Graduate" : value = 3; break;
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
                await this.transactionsService.debit(total, this.authService.data.name, this.consumer.cpf);
            } else {
                const errorAlert = await this.alertController.create({
                    header: "Saldo insuficiente!",
                    buttons: ["OK"]
                });
    
                await errorAlert.present();
            }
        } else {
            const errorAlert = await this.alertController.create({
                header: "Informar a quantidade",
                buttons: ["OK"]
            });

            await errorAlert.present();
        }
    }

}
