import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadChildren: () => import('../../custom/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('../../custom/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../custom/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'online',
        redirectTo: '/Chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/Chats',
    pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
