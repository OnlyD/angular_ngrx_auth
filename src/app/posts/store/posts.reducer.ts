import { createReducer, on } from "@ngrx/store";
import { Posts } from "../store/posts";
import { postsFetchAPISuccess } from "./posts.action";
 
export const initialState: ReadonlyArray<Posts> = [];
 
export const postReducer = createReducer(
    initialState,
    on(postsFetchAPISuccess, (state, { allPosts }) => {
      return allPosts;
    })
);