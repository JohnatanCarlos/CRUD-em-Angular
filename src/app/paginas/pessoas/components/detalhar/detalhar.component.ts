import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Historico } from './../../../../shared/models/historico.model';
import { PagamentosServices } from './../../../../core/services/pagamentos.service';

@Component({
  selector: 'vc-detalhar',
  templateUrl: './detalhar.component.html',
})
export class DetalharComponent {
  historico: Historico;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagamentosServices: PagamentosServices,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.idPessoa) {
      this.pagamentosServices
        .consultarHistorico(this.activatedRoute.snapshot.params.idPessoa)
        .subscribe((historico) => {
          this.historico = historico;
        });
    }
  }

  redirecionarHome() {
    this.router.navigate(['/pessoas']);
  }
}
