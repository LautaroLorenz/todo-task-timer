import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-row-with-actions',
  templateUrl: './row-with-actions.component.html',
  styleUrls: ['./row-with-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowWithActionsComponent {
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() actionsTemplate!: TemplateRef<any>;
}
