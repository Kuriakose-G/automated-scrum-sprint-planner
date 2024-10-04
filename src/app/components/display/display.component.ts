import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationState {
  selectedStories: any[]; // Define a more specific type if available
}

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {

  selectedStories: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      const state = navigation.extras.state as NavigationState;
      this.selectedStories = state.selectedStories || [];
    }
  }

}
