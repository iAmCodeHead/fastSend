import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'recipient-list', loadChildren: '../recipient-list/recipient-list.module#RecipientListPageModule' },
            { path: 'create-list', loadChildren: '../create-list/create-list.module#CreateListPageModule' },
            { path: 'quick-send', loadChildren: '../quick-send/quick-send.module#QuickSendPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
