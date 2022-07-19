import { createAction, props } from "@ngrx/store";
import { Posts } from "./posts";

export const invokePostsAPI = createAction(
    '[Posts API] Invoke Posts Fetch API'
  );
   
  export const postsFetchAPISuccess = createAction(
    '[Posts API] Fetch API Success',
    props<{ allPosts: Posts[] }>()
  );