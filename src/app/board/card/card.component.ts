import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PersonProperties } from '../../shared';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  properties = input.required<PersonProperties>();
  isWinner = input<boolean>(false);

  columns: string[] = ['birth'];
}
