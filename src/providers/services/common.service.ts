import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  showGLoaderFlag: any;

  constructor(
    public loadingCtrl: LoadingController,

  ) { }

  showLoader(message?: string) {
    console.log("showLoader", this.showGLoaderFlag);
    if (this.showGLoaderFlag) {
      return false;
    }
    this.showGLoaderFlag = true;
    let content = message ? message : "Please wait...";
    this.loadingCtrl.create({
      message: content
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
        this.showGLoaderFlag = false;
      });
    });
  }
  hideLoader() {
    if (this.showGLoaderFlag) {
      this.loadingCtrl.dismiss();
      this.showGLoaderFlag = false;
    }
  }
}
