import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/auth/login/login.page";
import { RegisterPage } from "./pages/auth/register/register.page";
import { AuthGuardService } from "./services/authGuard/auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "home", component: HomePage, canActivate: [AuthGuardService] },
    { path: "register", component: RegisterPage },
    { path: "login", component: LoginPage },
  { path: 'qrcode', loadChildren: "./pages/qrcode/qrcode.module#QrcodePageModule" },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
