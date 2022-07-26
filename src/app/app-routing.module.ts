import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./posts/posts.module').then((b) => b.PostsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((b) => b.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
