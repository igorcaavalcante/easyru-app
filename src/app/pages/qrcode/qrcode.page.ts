import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-qrcode",
    templateUrl: "./qrcode.page.html",
    styleUrls: ["./qrcode.page.scss"],
})
export class QrcodePage implements OnInit {

    private user: { logged: boolean, data: any };
    public ready = false;
    qrData = null;
    private code: string;
    scannedCode = null;

    constructor(private barcodeScanner: BarcodeScanner, private authService: AuthService) { }

    async ngOnInit() {
        this.authService.updateUserData();
        this.authService.user.subscribe((user) => {
            this.user = user;
        });
        this.code = await this.authService.data.user_hash;
        this.ready = true;
    }

    scanCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.scannedCode = barcodeData.text;
        });
    }

}
