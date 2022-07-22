# AngularNgrxAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Json Server

This app contains Json Server for testing purposes
`npm run json-run` to start the server

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Create new project

`ng new app_name`

### Generate new module

`ng generate module modune_name --routing` this will generate a new module along with its routing module

### Generate a component inside a module

`ng generate component module_name/component_name`

### Generate new entity

`ng generate interface module_name/store/entity_name` this will generate a new entity inside the folder "store"

```bash
export interface entity_name {
  prop1: number;
  prop2: string;
  prop3: string;
  prop4 number;
}
```

### Generate new reducer

`ng generate class module_name/store/entity_name.reducer` Reducer is a pure function, that gets invoked by the actions and then generates a new state in the store based on the action.

```bash
import { createReducer } from "@ngrx/store";
import { entity_name } from "../store/entity_name";
 
export const initialState: ReadonlyArray<entity_name> = [];
 
export const entity_nameReducer = createReducer(
    initialState
);
```

Register your reducer

```bash
// existing code hidden for display purpose
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './stroe/books.reducer';
 
@NgModule({
  imports: [
    StoreModule.forFeature('mybooks', bookReducer),
  ],
})
export class BooksModule {}
```

### Generate new selector

`ng generate class module_name/store/entity_name.selector` The 'Selector' is used to fetch any number of slices of data from the store into the components.

```bash
import { createFeatureSelector } from '@ngrx/store';
import { Books } from './books';
 
export const selectBooks = createFeatureSelector<Books[]>('mybooks');
```

### Generate actions class

`ng generate class books/store/books.action` The 'Actions' represents the events raised by the component to communicate either with reducers or effects to update the data to store

``` bash
import { createAction, props } from '@ngrx/store';
import { Books } from './books';
 
export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);
 
export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);
```

### Generate effects class

`ng generate class books/store/books.effect` The 'Effects' are used to invoke the API calls

```bash
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { BooksService } from '../books.service';
import { booksFetchAPISuccess, invokeBooksAPI } from './books.action';
import { selectBooks } from './books.selector';
 
@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store
  ) {}
 
  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      mergeMap(([, bookformStore]) => {
        if (bookformStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );
}
```

### Register effects in module

```bash
// existing code hidden for display purpose
import { EffectsModule } from '@ngrx/effects';
import { BooksEffect } from './store/books.effect';
 
@NgModule({
  imports: [
    EffectsModule.forFeature([BooksEffect])
  ],
})
export class BooksModule {}
```

### Generate new service

```bash
```

`ng generate service module_name/service_name`

```bash
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  get() {
  return this.http.get<Books[]>('http://localhost:3000/books');
}
}
```

### Register HttpClientModule in appModule

```bash
import {  HttpClientModule } from '@angular/common/http';
 
@NgModule({,
  imports: [
    HttpClientModule
  ]
})
export class AppModule { }
```
