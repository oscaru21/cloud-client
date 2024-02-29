import { Component } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCommandInputWrapperComponent } from '@spartan-ng/ui-command-helm'
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HlmIconComponent,
    HlmButtonDirective,
    HlmInputDirective,

    HlmCommandInputWrapperComponent,

    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent,

    HlmCardContentDirective,
    HlmCardDirective,
  ],
  providers: [
    provideIcons({ lucideSearch })
  ],
  template: `
    <div class="h-full flex flex-col ">
      <div class="flex flex-row bg-background m-4  gap-4">
        <hlm-cmd-input-wrapper class="bg-accent rounded-md flex-1">
          <hlm-icon name="lucideSearch" />
          <input class="w-full" placeholder="Search a previous transcriptions..." hlmInput/>
        </hlm-cmd-input-wrapper>
        <button hlmBtn align="end" [brnMenuTriggerFor]="menu">Add new</button>
      </div>
      @if (!transcripts.length) {
      <section class="m-4 flex flex-col min-h-[50%] justify-center content-center text-center" hlmCard>
        <p>No results found</p>
        <p class="font-extralight">It looks like you dont have any transcriptions</p>
        <button class="p-10 text-blue-600" hlmBtn variant='link'>Create new one</button>
      </section>
    } @else {
      <div>Hellow</div>
    }
    </div>
    
    <ng-template #menu>
      <hlm-menu class="w-56">
        <hlm-menu-group>
          <button hlmMenuItem>
            <span>Live Stream</span>
          </button>
        </hlm-menu-group>

        <hlm-menu-separator />

        <hlm-menu-group>
          <button hlmMenuItem>
            <span>Upload File</span>
          </button>
        </hlm-menu-group>
      </hlm-menu>
    </ng-template>
  `,
  styles: ``
})
export class DashboardComponent {
  transcripts = [
  ]
}
