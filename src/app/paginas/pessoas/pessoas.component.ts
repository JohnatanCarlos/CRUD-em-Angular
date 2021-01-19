import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoasServices } from './../../core/services/pessoas.service';

@Component({
  selector: 'vc-pessoas',
  templateUrl: './pessoas.component.html',
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoasServices) {}

  ngOnInit() {
    this.buscarPessoa();
  }

  buscarPessoa() {
    this.pessoaService.listarTodasPessoas().subscribe((data) => {
      console.log(data);
      this.pessoas = data;
    });
  }

  confirmarRemover(idPessoa: number) {
    Swal.fire({
      title: 'Tem Certeza',
      text: `Você tem certeza que deseja REMOVER #id ${idPessoa}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.removerPessoa(idPessoa);
        Swal.fire('Deletado com Sucesso!');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Operação Cancelada!');
      }
    });
  }

  removerPessoa(idPessoa: number) {
    this.pessoaService.deletarPessoa(idPessoa).subscribe((data) => {
      this.buscarPessoa();
    });
  }
}
