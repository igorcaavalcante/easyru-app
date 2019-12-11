import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/auth/login/login.page";
import { AuthGuardService } from "./services/authGuard/auth-guard.service";
import { QrcodePage } from "./pages/qrcode/qrcode.page";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "home", component: HomePage, canActivate: [AuthGuardService] },
    { path: "login", component: LoginPage },
    { path: "qrcode", component: QrcodePage },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
