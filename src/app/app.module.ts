import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { NgxQRCodeModule } from "ngx-qrcode2";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/auth/login/login.page";
import { QrcodePage } from "./pages/qrcode/qrcode.page";

import { BrMaskerModule } from "br-mask";
import { BrCurrencyPipe } from "./pipes/br-currency.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    BrCurrencyPipe,
    QrcodePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrMaskerModule,
    NgxQRCodeModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
