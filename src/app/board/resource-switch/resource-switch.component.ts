import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ResourceType, UI_TEXTS } from '../../shared';
import { ResourcesFacade } from '../../core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-resource-switch',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './resource-switch.component.html',
})
export class ResourceSwitchComponent {
  #resourcesFacade = inject(ResourcesFacade);
  resourceType = toSignal(this.#resourcesFacade.currentResourceType$);

  handleResourceTypeChanged(event: ResourceType) {
    this.#resourcesFacade.setResourceType(event);
  }

  options = [
    {
      label: UI_TEXTS.people,
      value: ResourceType.People,
    },
    {
      label: UI_TEXTS.starships,
      value: ResourceType.Starships,
    },
  ];
}
