import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './store/posts.effect';
import { PostsRoutingModule } from './posts-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature('myPosts', postReducer),
    EffectsModule.forFeature([PostsEffect]),
  ]
})
export class PostsModule { }
