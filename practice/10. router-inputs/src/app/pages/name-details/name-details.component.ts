import { Component, computed, input, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-name-details',
  standalone: true,
  imports: [],
  templateUrl: './name-details.component.html',
  styleUrl: './name-details.component.scss'
})
export default class NameDetailsComponent implements AfterViewInit {

  // Create a 'name' signal here, which receives the name parameter from the router
  name = input.required<string>();

  // Create a computed signal 'upperCaseName' which returns the name in uppercase
  upperCaseName = computed(() => this.name().toUpperCase());

  // Create a computed signal 'NameLength' which returns the length of the name
  nameLength = computed(() => this.name().length);

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log(this.name());
  } 
  constructor() {
    console.log('Constructor');
  }
}

