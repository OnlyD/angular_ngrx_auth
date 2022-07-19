import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './store/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Posts[]>('http://localhost:3000/posts');
  }
}
