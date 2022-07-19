import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokePostsAPI } from '../store/posts.action';
import { selectPosts } from '../store/posts.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store) {}
  posts$ = this.store.pipe(select(selectPosts));
 
  ngOnInit(): void {
    this.store.dispatch(invokePostsAPI());
  }

}
