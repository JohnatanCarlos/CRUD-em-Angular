import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasComponent } from './pessoas.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { DetalharComponent } from './components/detalhar/detalhar.component';
import { FormularioPessoaComponent } from './components/formulario-pessoa/formulario-pessoa.component';

const routes: Routes = [
    {
        path: 'listar', 
        component: PessoasComponent
    },
    {
        path: 'cadastrar', 
        component: FormularioPessoaComponent
    },
    {
        path: 'editar/:idPessoa', 
        component: FormularioPessoaComponent
    },
    {
        path: 'detalhar/:idPessoa',
        component: DetalharComponent
    },
    {
        path: 'pagar', 
        component: PagarComponent
    },
    {
        path: 'pagar/:idPessoa', 
        component: PagarComponent
    },
    {   
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoasRoutingModule { }