import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Repository } from 'src/app/interfaces/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  username!: string;
  userData!: User;
  repoData!: Repository[];
  currentPage: number = 1;
  twitterUrl!: string | null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    const { id } = this.route.snapshot.params;
    this.username = id;
  }
  ngOnInit() {
    this.apiService.getUser(this.username).subscribe((response: User) => {
      this.userData = response;
      if (this.userData.twitter_username) {
        this.twitterUrl = `https://twitter.com/${this.userData.twitter_username}`;
      }
    });

    this.apiService
      .getRepos(this.username, this.currentPage)
      .subscribe((response) => {
        if (!response) {
          return;
        }
        this.repoData = [];
        response.map((repository: any, index: number) => {
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
}
