import { Router } from "@angular/router";
import { Entity } from "../../entity/entity.model";


export abstract class CrudPageAbstract {
  constructor(
    protected router: Router,
    private entity: Entity,
  ) { }

  openDetailPage(id?: number) {
    if(!!Number(id)) {
      this.router.navigate([this.entity.singular.concat('-detail'), id]);
    } else {
      this.router.navigate([this.entity.singular.concat('-detail')]);
    }
  }
}