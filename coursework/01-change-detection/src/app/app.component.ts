import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// Change detection occurs on inputs and outputs
// OnPush is used to optimize performance by not checking for changes unless the input or output changes
// This is useful for large applications with many components
// OnPush is the default change detection strategy for Angular components
// OnPush is not suitable for all components, especially those that rely on external data sources or services
export class AppComponent {
  counter = 0;
  readonly changeDetector = inject(ChangeDetectorRef);

  doNothing(){
  }

 
  constructor() {
    setInterval(()=>{
      this.counter++;
      console.log(this.counter);
    }, 1000);

    setInterval(() => {
      this.changeDetector.detectChanges(); // Manually trigger change detection
    }, 5000)
  }



}
