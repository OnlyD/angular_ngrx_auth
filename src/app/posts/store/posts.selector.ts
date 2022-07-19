import { createFeatureSelector } from '@ngrx/store';
import { Posts } from './posts';
 
export const selectPosts = createFeatureSelector<Posts[]>('myPosts');