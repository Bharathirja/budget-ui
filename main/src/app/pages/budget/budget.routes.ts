import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'create-transaction',
        component: CreateTransactionComponent,
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent
      }
      // {
      //   path: 'chips',
      //   component: AppChipsComponent,
      // },
      // {
      //   path: 'lists',
      //   component: AppListsComponent,
      // },
      // {
      //   path: 'menu',
      //   component: AppMenuComponent,
      // },
      // {
      //   path: 'tooltips',
      //   component: AppTooltipsComponent,
      // },
      // {
      //   path: 'forms',
      //   component: AppFormsComponent,
      // },
      // {
      //   path: 'tables',
      //   component: AppTablesComponent,
      // },
    ],
  },
];
