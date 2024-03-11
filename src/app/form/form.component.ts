import { Component } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [BrnSelectImports, HlmSelectImports, HlmLabelDirective, HlmInputDirective, HlmButtonDirective],
  template: `
    <div class="w-full sm:w-[70%] h-full mx-auto ">
      <div class="flex flex-col mx-4">
      <label class="my-4 mb-1.5 block" hlmLabel>
        File Name
      </label>
      <input class="w-full my-2" hlmInput type="text" placeholder="Enter File Name"/>
      <brn-select class="w-full my-4" placeholder="To Language">
        <hlm-select-trigger class="w-full my-2">
          <hlm-select-value />
        </hlm-select-trigger>
        <hlm-select-content class="w-full">
          <hlm-option value="en">English</hlm-option>
          <hlm-option value="es">Spanish</hlm-option>
          <hlm-option value="fr">French</hlm-option>
        </hlm-select-content>
      </brn-select>
    
    <label class="my-4 mb-1.5 block" hlmLabel>
      File
    </label>
    <input class="w-full my-2" hlmInput type="file" (change)="onFileSelected($event)"/>
    @if(fileUrl){
      <audio controls class="w-full my-2" >
        <source [src]="fileUrl" type="audio/mpeg">
      </audio>
    }
    <button class="w-full my-4" hlmBtn>Upload</button>
      </div>
    </div>
  `,
  styles: `
  :host(app-form) { width:100% }
`
})
export class FormComponent {
  fileUrl: string | undefined;

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl)
    }
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);
      this.fileUrl = url
    } else {
      this.fileUrl = undefined
    }
  }
}
