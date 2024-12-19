import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  TemplateRef,
  AfterContentInit,
  ViewEncapsulation
} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-drop-down-menu',
  standalone: true,
  templateUrl: './drop-down-menu.component.html',
  imports: [
    NgIf,
    NgForOf,
    NgTemplateOutlet
  ],
  styleUrls: ['./drop-down-menu.component.css'],
})
export class DropDownMenuComponent implements AfterContentInit {
  @Input() buttonLabel: string = 'Dropdown';
  @Output() itemClick = new EventEmitter<any>();

  @ContentChildren('menuItem') menuItems!: QueryList<TemplateRef<any>>;

  public hasContent = false;

  ngAfterContentInit(): void {
    this.hasContent = this.menuItems.length > 0;
  }

  onItemClick(data: any) {
    this.itemClick.emit(data);
  }
}
