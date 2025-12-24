import {
  Component,
  signal,
  viewChild,
  ElementRef,
  ViewContainerRef,
  viewChildren,
  effect
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RATES } from './components/currency-converter/rates';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionSelectorComponent } from './components/option-selector/option-selector.component';
import { OptionDirective } from './components/option-selector/option.directive';
import { RgbDirective } from './directives/rgb.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyConverterComponent,
    ReactiveFormsModule,
    OptionSelectorComponent,
    OptionDirective,
    RgbDirective
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currencyConverter = viewChild.required(CurrencyConverterComponent);
  currencyConverters= viewChildren(CurrencyConverterComponent)
  myRefDiv  = viewChild.required('myRef', { read: ViewContainerRef});
  stopRefresh() {
    console.log('stopRefresh');
    // this.currencyConverter().stopRefresh();

    for (const converter of this.currencyConverters()) {
      converter.stopRefresh();
    }
  }

  readonly currencies = Object.keys(RATES);

  readonly currency = signal('GBP');

  amount = new FormControl(100);

  refreshData() {
    console.log('refreshData');
  }

  constructor() {
    console.log('AppComponent constructor');
    console.log('this.currencyConverters', this.currencyConverters());
    effect(() => {
      console.log('effect this.currencyConverters', this.currencyConverters());
      console.log('effect this.currencyConverter', this.currencyConverter());
    });
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log('this.currencyConverters', this.currencyConverters());
    console.log('this.currencyConverter', this.currencyConverter());
  }

  ngOnInit(): void {
          console.log('effect this.currencyConverter', this.currencyConverter());

  }
}

