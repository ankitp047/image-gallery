import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ALL_CONSTANTS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(
    private http:HttpClient,
  ) { 

  }
  private getDataFromApi(api,params=null,offset=null){
    let endpoint_url=api;
    if(params!=null){
        endpoint_url+="?";
        for (let key in params) {
            endpoint_url += key+"="+params[key];
            endpoint_url+="&";
        }
    endpoint_url = endpoint_url.substr(0,endpoint_url.length-1);
    }
    if(offset!=null){
        if(params==null){
            endpoint_url +='offset='+offset;
        }else{
            endpoint_url +='&offset='+offset;
        }
    }
    let api_url=ALL_CONSTANTS.API_URL+endpoint_url;
    console.log('api',api_url);
    try {
      let req =  this.http.get(api_url);
      return req;
    } catch (error) {
        console.log('error from net',error);
        return error
    }
  }
  getImageByCategory(category,page){
    let params = {
      category:category,
      page:page,
      per_page:ALL_CONSTANTS.LOAD_MORE_LIMIT,
      key:ALL_CONSTANTS.API_KEY
    }
    let endpoint = '';
    return this.getDataFromApi(endpoint,params);
  }
  getImageById(id){
    let params = {
      id:id,
      key:ALL_CONSTANTS.API_KEY
    }
    let endpoint = '';
    return this.getDataFromApi(endpoint,params);
  }
}
