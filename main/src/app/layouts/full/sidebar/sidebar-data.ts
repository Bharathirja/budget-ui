import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },

  {
    navCap: 'Your Budget',
  },
  {
    displayName: 'Category',
    iconName: 'archive',
    route: '/budget/category',
  },
  {
    displayName: 'Transactions',
    iconName: 'archive',
    route: '/budget/transactions',
  },
  // {
  //   displayName: 'Chips',
  //   iconName: 'info-circle',
  //   route: '/budget/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'list-details',
  //   route: '/budget/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'file-text',
  //   route: '/budget/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'file-text-ai',
  //   route: '/budget/tooltips',
  // },
  // {
  //   displayName: 'Forms',
  //   iconName: 'clipboard-text',
  //   route: '/budget/forms',
  // },
  // {
  //   displayName: 'Tables',
  //   iconName: 'table',
  //   route: '/budget/tables',
  // },

  
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'login',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Login',
  //       iconName: 'point',
  //       route: '/authentication/login',
  //     },
     
  //   ],
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Register',
  //       iconName: 'point',
  //       route: '/authentication/register',
  //     },
     
  //   ],
  // },
  
  
];
