import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-edit-preview',
  imports: [CommonModule],
  templateUrl: './type-edit-preview.component.html',
  styleUrl: './type-edit-preview.component.scss'
})
export class TypeEditPreviewComponent {
  @Input({
    required: true
  })
  public selectedImageUrl!: string;

  @Input({
    required: true
  })
  public backgroundColor1!: string;

  @Input({
    required: true
  })
  public backgroundColor2!: string;

  @Input({
    required: true
  })
  public textColor!: string;

  @Input({
    required: true
  })
  public typeName!: string;

  public getComponentStyle() {
    return {
      'background': `radial-gradient(${this.backgroundColor1}, ${this.backgroundColor2})`,
      'color': `${this.textColor}`
    };
  }
}
