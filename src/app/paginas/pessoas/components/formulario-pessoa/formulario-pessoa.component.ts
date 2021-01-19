import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PessoasServices } from 'src/app/core/services/pessoas.service';


@Component({
    selector: 'vc-formulario-pessoas',
    templateUrl: './formulario-pessoa.component.html'
})
export class FormularioPessoaComponent{
    form: FormGroup;
    btnNome = 'Cadastrar';
    expressaoEmailRegEx = /\S+@\S+\.\S+/;

    constructor(
        formBuilder: FormBuilder, 
        private pessoasService: PessoasServices, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService
        ){
        this.form = formBuilder.group({
            pessoa_id: [null],
            nome: [null, [Validators.required, Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]]
        });

    }

    ngOnInit(){
        if(this.activatedRoute.snapshot.params.idPessoa){
            this.buscarPessoaPorId(this.activatedRoute.snapshot.params.idPessoa);
            this.btnNome = 'Atualizar';
        }else {
            this.btnNome = 'Cadastrar';
        }
        console.log(this.activatedRoute.snapshot.params.idPessoa)
    }

    enviar(){

        if(!this.expressaoEmailRegEx.test(this.form.value.email)){
            this.toastr.error('Email Inválido', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
            })
            return
        }

        if(this.form.value.pessoa_id){
            this.pessoasService.atualizarPessoa(this.form.value.pessoa_id, this.form.value)
                .subscribe(data => {
                    this.toastr.success('Editado Com Sucesso!', '', {
                        timeOut: 3000,
                        positionClass: 'toast-top-center'
                    })
                    this.router.navigate(['/pessoas'])
                })
        }else{
            this.pessoasService.cadastrarPessoa(this.form.value).subscribe(data => {
                this.toastr.success('Cadastrado Com Sucesso!', '', {
                    timeOut: 3000,
                    positionClass: 'toast-top-center'
                })
                this.router.navigate(['/pessoas'])
            });
        }
        
    }

    buscarPessoaPorId(idPessoa: number){
        this.pessoasService.buscarPessoaPorId(idPessoa).subscribe(pessoa =>{
           this.form.patchValue({
                pessoa_id: pessoa.pessoa_id,
                nome: pessoa.nome,
                email: pessoa.email
           })
        })
    }


    redirecionarHome(){
        this.router.navigate(['/pessoas'])
    }

}