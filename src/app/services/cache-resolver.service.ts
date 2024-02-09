import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CacheResolverService {
  private cache = new Map<string, [Date|null, HttpResponse<any>]>();
  constructor() {}

  set(key: string, value: HttpResponse<any>, timeToLive: number | null = null) {
    // console.log('Set cache key', key);
    if (this.cache.has(key)) {
      const existingEntry = this.cache.get(key);
      if (existingEntry) {
        existingEntry[0] = timeToLive ? new Date(new Date().getTime() + timeToLive * 1000) : null;
        existingEntry[1] = value;
        this.cache.set(key, existingEntry);
      }
    } else {
      if (timeToLive) {
        const expiresIn = new Date();
        expiresIn.setSeconds(expiresIn.getSeconds() + timeToLive);
        this.cache.set(key, [expiresIn, value]);
      } else {
        this.cache.set(key, [null, value]);
      }
    }
    // console.log(this.cache);
  }

  get(key:string):HttpResponse<any>|null {
    const tuple = this.cache.get(key);
    if(!tuple) return null;
    const expiresIn = tuple[0];
    const httpSavedResponse = tuple[1];
    const now = new Date();
    if(expiresIn && expiresIn.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }
    return httpSavedResponse;
  }
}
