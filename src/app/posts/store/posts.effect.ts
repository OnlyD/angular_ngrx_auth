import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { PostsService } from '../posts.service';
import { postsFetchAPISuccess, invokePostsAPI } from './posts.action';
import { selectPosts } from './posts.selector';
 
@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}
 
  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokePostsAPI),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([, postformStore]) => {
        if (postformStore.length > 0) {
          return EMPTY;
        }
        return this.postsService
          .get()
          .pipe(map((data) => postsFetchAPISuccess({ allPosts: data })));
      })
    )
  );
}