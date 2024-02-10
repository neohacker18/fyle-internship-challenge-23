import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('getUser', () => {
  //   it('should return user data', () => {
  //     const mockUser = { login: 'testuser', id: 123 };

  //     service.getUser('testuser').subscribe(user => {
  //       expect(user).toEqual(mockUser);
  //     });

  //     const request = httpMock.expectOne('https://api.github.com/users/testuser');
  //     expect(request.request.method).toBe('GET');
  //     request.flush(mockUser);
  //   });

  //   it('should cache response', () => {
  //     const mockUser = { login: 'testuser', id: 123 };

  //     service.getUser('testuser').subscribe();
  //     const request = httpMock.expectOne('https://api.github.com/users/testuser');
  //     request.flush(mockUser);

  //     service.getUser('testuser').subscribe(user => {
  //       expect(user).toEqual(mockUser);
  //     });

  //     httpMock.expectNone('https://api.github.com/users/testuser'); // Make sure no new request is made
  //   });
  // });

  // describe('getRepos', () => {
  //   it('should return repositories data', () => {
  //     const mockRepos = [{ name: 'repo1' }, { name: 'repo2' }];

  //     service.getRepos('testuser', 1, 10).subscribe(repos => {
  //       expect(repos).toEqual(mockRepos);
  //     });

  //     const request = httpMock.expectOne('https://api.github.com/users/testuser/repos?sort=updated&page=1&per_page=10');
  //     expect(request.request.method).toBe('GET');
  //     request.flush(mockRepos);
  //   });

    // it('should cache response', () => {
    //   const mockRepos = [{ name: 'repo1' }, { name: 'repo2' }];

    //   service.getRepos('testuser', 1, 10).subscribe();
    //   const request = httpMock.expectOne('https://api.github.com/users/testuser/repos?sort=updated&page=1&per_page=10');
    //   request.flush(mockRepos);

    //   service.getRepos('testuser', 1, 10).subscribe(repos => {
    //     expect(repos).toEqual(mockRepos);
    //   });

    //   httpMock.expectNone('https://api.github.com/users/testuser/repos?sort=updated&page=1&per_page=10'); // Make sure no new request is made
    // });
  // });
});
