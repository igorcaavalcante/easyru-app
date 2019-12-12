import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgxQRCodeModule } from "ngx-qrcode2";

import { IonicModule } from "@ionic/angular";

import { QrcodePage } from "./qrcode.page";

const routes: Routes = [
  {
    path: "",
    component: QrcodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
  ],
  declarations: [QrcodePage]
})
export class QrcodePageModule { }
