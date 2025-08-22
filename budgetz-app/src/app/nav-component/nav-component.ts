import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-component.html',
  styleUrls: ['./nav-component.scss']
})
export class NavbarComponent {
  @Output() pageChange = new EventEmitter<string>();

  navigate(page: string) {
    this.pageChange.emit(page);
  }
}
