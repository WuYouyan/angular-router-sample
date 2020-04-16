import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: 'compose', component: ComposeMessageComponent, outlet: `popup`},
  {
    path:'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule)
  },
  {path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { 
        enableTracing: true, // <--debugging purposes
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
