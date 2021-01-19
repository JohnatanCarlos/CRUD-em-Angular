import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoasServices } from 'src/app/core/services/pessoas.service';
import { PagamentosServices } from './../../../../core/services/pagamentos.service';

@Component({
  selector: 'vc-pagar',
  templateUrl: './pagar.component.html',
})
export class PagarComponent {
  form: FormGroup;
  pessoas: Pessoa[] = [];

  constructor(
    private pessoasServices: PessoasServices,
    formBuilder: FormBuilder,
    private pagamentosServices: PagamentosServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group({
      idPagador: [null, Validators.required],
      idRecebedor: [null, Validators.required],
      valor: [null, Validators.required],
    });

    this.carregarPessoas();
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.idPessoa) {
        this.form.patchValue({
            idRecebedor: this.activatedRoute.snapshot.params.idPessoa
        })

        this.form.get('idRecebedor').disable()
    }
  }

  enviarPagamento() {
    this.form.value.idPagador = parseInt(this.form.value.idPagador);
    this.form.value.idRecebedor = parseInt(this.form.value.idRecebedor);

    if (this.form.getRawValue().idPagador === this.form.getRawValue().idRecebedor) {
        this.toastr.warning('O REMETENTE não pode ser igual ao DESTINATÁRIO', '', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
      })
      return;
    }

    if(!this.form.getRawValue().valor){
      this.toastr.error('O valor não pode ser igual a ZERO', 'ERRO', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
      return 
    }

    this.pagamentosServices
      .realizarPagamento(this.form.getRawValue())
      .subscribe((pagamento) => {
        this.toastr.success('PAGAMENTO', `Transferência enviada com sucesso!`, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(['/pessoas']);
      });
  }

  redirecionarHome() {
    this.router.navigate(['/pessoas']);
  }

  private carregarPessoas() {
    this.pessoasServices.listarTodasPessoas().subscribe((pessoas) => {
      this.pessoas = pessoas;
    });
  }
}
