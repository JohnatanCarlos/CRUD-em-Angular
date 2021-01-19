import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

import { PessoasComponent } from './pessoas.component';
import { DetalharComponent } from './components/detalhar/detalhar.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { MonetarioPipe } from 'src/app/shared/pipes/monetario.pipe';
import { FormularioPessoaComponent } from './components/formulario-pessoa/formulario-pessoa.component';

@NgModule({
    imports: [
        CommonModule,
        PessoasRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        NgxMaskModule.forRoot(),
    ],
    declarations: [   
        PessoasComponent, 
        FormularioPessoaComponent, 
        PagarComponent, 
        DetalharComponent,
        MonetarioPipe
    ],
    exports: [
        MonetarioPipe
    ]
})
export class PessoasModule {

}