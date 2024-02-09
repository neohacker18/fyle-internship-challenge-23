import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchBar:FormControl=new FormControl('');
  errorMessage:string='';

  constructor(private apiService:ApiService){
    this.errorMessage=this.apiService.getError()
    this.apiService.setError('')
    setTimeout(() => {
      this.errorMessage=''
    }, 3000);
  }
  
}
