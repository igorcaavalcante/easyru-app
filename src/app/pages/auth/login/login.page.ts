import { Component, OnInit } from "@angular/core";
import { FormComponent } from "src/interfaces/FormComponent";
import { LoadingController, AlertController, MenuController } from "@ionic/angular";
import { UtilsService } from "src/app/services/utils/utils.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

    public user = {
        cpf: { value: "", message: null } as FormComponent,
        password: { value: "", message: null } as FormComponent,
    };

    constructor(
        public loadingController: LoadingController,
        public utils: UtilsService,
        public auth: AuthService,
        public alertController: AlertController,
        private menuCtrl: MenuController,
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.menuCtrl.enable(false);
        if (this.authService.isAuthenticated()) {
            this.router.navigate(["home"]);
        }
    }

    async login() {

        const loading = await this.loadingController.create({
            message: "Carregando"
        });
        await loading.present();

        let errors = false;

        this.user.cpf.message = null;
        this.user.password.message = null;

        // this.user.cpf.value = this.user.cpf.value.replace(/\D+/g, "");

        if (!this.utils.isCpf(this.user.cpf.value)) {
            this.user.cpf.message = "CPF inválido!";
            errors = true;
        }

        if (!this.utils.isPassword(this.user.password.value)) {
            this.user.password.message = "Senha inválida!";
            errors = true;
        }

        if (errors) {
            loading.dismiss();
            return;
        }

        const login = await this.auth.login(this.user.cpf.value, this.user.password.value);

        loading.dismiss();

        if (typeof login === "object" && !login.success) {

            const errorAlert = await this.alertController.create({
                header: "Erro ao fazer login.",
                message: login.message,
                buttons: ["OK"]
            });

            await errorAlert.present();

            return;
        }

        this.router.navigateByUrl("/home");

    }

}
