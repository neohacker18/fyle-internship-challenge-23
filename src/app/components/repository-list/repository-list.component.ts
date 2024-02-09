import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Repository } from 'src/app/interfaces/repository';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  username!: string;
  userData!: User;
  repoData: Repository[] = [];
  twitterUrl!: string | null;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  totalItems: number = 1;
  apiPageNumber: number = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    const { id } = this.route.snapshot.params;
    this.username = id;
  }

  addItem(newItem: number) {
    this.currentPage = newItem;
    this.getData();
  }

  private getData() {
    const response = this.apiService.getRepos(this.username, this.currentPage);

    this.apiService
      .getRepos(this.username, this.currentPage)
      .subscribe((response) => {
        if (!response) {
          return;
        }
        this.repoData = [];
        this.totalPages = Math.ceil(this.totalItems / 6);

        response.body.map((repository: any, index: number) => {
          this.repoData.push({
            id: index,
            repoName: repository.name,
            description: repository.description,
            topics: repository.topics,
            url: repository.html_url,
          });
        });
      });
  }
  ngOnInit() {
    const response = this.apiService.getUser(this.username);
    this.apiService.getUser(this.username).subscribe((response:any) => {
      this.userData = response.body;
      this.totalItems = this.userData.public_repos;
      if (this.userData.twitter_username) {
        this.twitterUrl = `https://twitter.com/${this.userData.twitter_username}`;
      }
    });
    this.getData();
  }
}
