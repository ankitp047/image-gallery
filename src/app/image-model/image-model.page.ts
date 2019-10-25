import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/providers/services/get-data.service';
import { CommonService } from 'src/providers/services/common.service';

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.page.html',
  styleUrls: ['./image-model.page.scss'],
})
export class ImageModelPage implements OnInit {
  imageId: any;
  imageDetails: any;

  constructor(
    private param:ActivatedRoute,
    private get:GetDataService,
    private router:Router,
    private com:CommonService
  ) { }

  ngOnInit() {
    this.param.queryParams.subscribe((data)=>{
      this.imageId = data.imageId
      },err=>{
       console.log(err);
    })
  }
  ionViewDidEnter(){
    console.log('data',this.imageId);
    this.com.showLoader();
    /**
     * get the image details by Image ID from API
     *
     * @param imageId
     * @returns 
     */
    this.get.getImageById(this.imageId).subscribe((data)=>{
      console.log('img',data);
      this.imageDetails = data.hits[0];
    },err=>{
      this.com.hideLoader();
      console.log(err);
    })
  }
  /**
   * called when image is started loading
   *
   * @param 
   * @returns 
   */
  loadImgStart(){
    console.log('img load start',);
  }
  /**
   * called when image loading completed
   *
   * @param 
   * @returns 
   */
  loadImgStop(){
    this.com.hideLoader();
    console.log('img load stop',);
  }

}
