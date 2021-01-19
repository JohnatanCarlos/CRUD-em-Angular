import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'pessoas', 
        loadChildren: () => import('./paginas/pessoas/pessoas.module').then(module => module.PessoasModule)
    },
    {   
        path: '',
        redirectTo: 'pessoas',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }