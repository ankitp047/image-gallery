import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private category = ['fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 'feelings', 'religion', 'health', 'places', 'animals', 'industry', 'food', 'computer', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music'];
  constructor(
    private router:Router
  ) {
    
  }

  ngOnInit() {
  }
  /**
   * This function redirect to the Details page
   *
   * @param category
   * @returns 
   */
  gotoDetails(category){
    this.router.navigate(['/details'],{queryParams:{category:category}});
  }
}
