import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/providers/services/get-data.service';
import { ALL_CONSTANTS } from 'src/providers/constant';
import { CommonService } from 'src/providers/services/common.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  category: any;
  PAGE: number=1;
  imageAry: any[]=[];
  loadMoreEvent: any;

  constructor(
    private param:ActivatedRoute,
    private get:GetDataService,
    private router:Router,
    private com:CommonService,
  ) { }

  ngOnInit() {
    this.param.queryParams.subscribe((data)=>{
      this.category = data.category
      },err=>{
       console.log(err);
    })
  }
  ionViewDidEnter(){
    this.imageAry=[];
    this.loadData();
  }
  /**
   * Loads the data from the API and insert into display array
   *
   * @param 
   * @returns 
   */
  loadData(){
    return new Promise((res,rej)=>{
      this.com.showLoader();
      this.get.getImageByCategory(this.category,this.PAGE).subscribe((data)=>{
        console.log('data',data);
        for (const iterator of data.hits) {
          this.imageAry.push(iterator);
        }
        if(this.loadMoreEvent){
          if(data.hits<ALL_CONSTANTS.LOAD_MORE_LIMIT){
            this.loadMoreEvent.target.disabled = true;
          }else{
            this.loadMoreEvent.target.disabled = false;
          }
        }
        this.com.hideLoader();
        res(true)
      },err=>{
        this.com.hideLoader();
        rej(err);
        console.log(err);
      })
    })
  }
  /**
   * Redirects to the Image Details page
   *
   * @param 
   * @returns 
   */
  displayImage(item){
    this.router.navigate(['/image-model'],{queryParams:{imageId:item.id}});
  }
  /**
   * 
   *
   * @param 
   * @returns 
   */
  loadMoreData($e){
      console.log('Done');
      this.loadMoreEvent = $e;
      this.PAGE += 1;
      this.loadData().then((data)=>{
        $e.target.complete();
      }).catch((err)=>{
        $e.target.complete();

      })

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
  }
}
