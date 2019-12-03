import { Component, OnInit } from "@angular/core";
import { FormComponent } from "src/interfaces/FormComponent";
import { LoadingController, AlertController, MenuController } from "@ionic/angular";
import { UtilsService } from "src/app/services/utils/utils.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {

    public user = {
        email: { value: "", message: null } as FormComponent,
        password: { value: "", message: null } as FormComponent,
        confirmPassword: { value: "", message: null } as FormComponent,
        name: { value: "", message: null } as FormComponent,
        cpf: { value: "", message: null } as FormComponent,
        type: { value: "", message: null } as FormComponent,
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

    async register() {

        const loading = await this.loadingController.create({
            message: "Carregando"
        });
        await loading.present();

        let errors = false;

        this.user.email.message = null;
        this.user.password.message = null;
        this.user.confirmPassword.message = null;
        this.user.name.message = null;
        this.user.cpf.message = null;
        this.user.type.message = null;

        const cpf = this.user.cpf.value.replace(/\D+/g, "");

        if (!this.utils.checkUserType(this.user.type.value)) {
            this.user.type.message = "Tipo de usuário inválido!";
            errors = true;
        }

        if (!this.utils.isEmail(this.user.email.value)) {
            this.user.email.message = "E-mail inválido!";
            errors = true;
        }

        if (!this.utils.isCpf(cpf)) {
            this.user.cpf.message = "CPF inválido!";
            errors = true;
        }

        if (!this.utils.isPassword(this.user.password.value)) {
            this.user.password.message = "Senha inválida!";
            errors = true;
        }

        if (this.user.password.value !== this.user.confirmPassword.value) {
            this.user.password.message = "As senhas são diferentes!";
            errors = true;
        }

        if (errors) {
            loading.dismiss();
            return;
        }

        const user: any = [];

        const register = await this.auth.register(user);

        loading.dismiss();

        if (typeof register === "object" && !register.success) {

            let message = "";
            if (typeof register.message === "object") {
                for (const error of register.message) {
                    message += `- ${error} <br>`;
                }
            } else {
                message = register.message;
            }

            const errorAlert = await this.alertController.create({
                header: "Erro ao fazer cadastro.",
                message,
                buttons: ["OK"]
            });

            await errorAlert.present();

            return;
        }

        const successAlert = await this.alertController.create({
            header: "Cadastro feito com sucesso!",
            buttons: ["OK"],
        });

        await successAlert.present();

        this.router.navigate(["home"]);

    }

}
