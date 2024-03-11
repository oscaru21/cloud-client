import { Component, inject } from '@angular/core';
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
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import {
  HlmAccordionContentDirective,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
} from '@ng-icons/lucide';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
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

    BrnAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentDirective,
    HlmAccordionIconDirective
  ],
  providers: [
    provideIcons({ lucideSearch })
  ],
  template: `
    <div class="h-full flex flex-col mx-4 ">
      <div class="flex flex-row bg-background my-4  gap-4">
        <hlm-cmd-input-wrapper class="bg-accent rounded-md flex-1">
          <hlm-icon name="lucideSearch" />
          <input class="w-full" placeholder="Search a previous transcriptions..." hlmInput/>
        </hlm-cmd-input-wrapper>
        <button hlmBtn align="end" [brnMenuTriggerFor]="menu">Add new</button>
      </div>
      @if (!transcripts.length) {
      <section class=" flex flex-col min-h-[50%] justify-center content-center text-center" hlmCard>
        <p>No results found</p>
        <p class="font-extralight">It looks like you dont have any transcriptions</p>
        <button routerLink="/create" class="p-10 text-blue-600" hlmBtn variant='link'>Create new one</button>
      </section>
    } @else {
      <div hlmAccordion>
        @for(transcription of transcripts; track transcription.id){
          <div hlmAccordionItem>
              <button class="text-left" hlmAccordionTrigger>
                  {{transcription.title}}
                  <hlm-icon hlmAccIcon />
              </button>
              <brn-accordion-content hlm>{{transcription.body}}</brn-accordion-content>
          </div>
        }
      </div>
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
          <button routerLink="/create" hlmMenuItem>
            <span>Upload File</span>
          </button>
        </hlm-menu-group>
      </hlm-menu>
    </ng-template>
  `,
  styles: `
  :host(app-dashboard) { width:100% }
`
})
export class DashboardComponent {
  transcripts: any = []
  http = inject(HttpClient)

  ngOnInit() {
    this.fetchTranscripts()
  }

  fetchTranscripts() {
    this.http.get("http://localhost:3000/postss")
      .subscribe((posts: any) => {
        console.log(posts)
        //first 10 elements of posts
        posts = posts.slice(0, 10)
        this.transcripts = posts
      }
      )
  }
}
