import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PersonProperties, StarshipProperties, UI_TEXTS } from '../../shared';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatTableModule, NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  properties = input.required<PersonProperties | StarshipProperties>();
  isWinner = input<boolean>(false);
  uiTexts = UI_TEXTS;

  personProperties = computed(() => this.properties() as PersonProperties);
  starshipProperties = computed(() => this.properties() as StarshipProperties);
  isPeopleMode = computed(
    () => (this.properties() as PersonProperties).birth_year !== undefined
  );
}
