import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monetario'
})
export class MonetarioPipe implements PipeTransform {

  transform(valor: number) {
    return `R$ ${valor}`;
  }

}