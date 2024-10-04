import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-sprint-display',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sprint-display.component.html',
  styleUrl: './sprint-display.component.css'
})
export class SprintDisplayComponent {

  sprintForm!: FormGroup;
  selectedStories: any[] = [];
  noStoriesMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private service: StoryService,
    private router: Router
  ) {
    this.sprintForm = this.fb.group({
      sprintPoints: ['', [Validators.required, Validators.min(1)]]
    });
  }

  autoSelectStories() {
    const sprintPoints = this.sprintForm.value.sprintPoints;
    const allStories = this.service.getStories();
    let bestSum = 0;
    const selected: any[] = [];

    for (const story of allStories) {
      const pointsLength = story.points.length;

      if (bestSum + pointsLength <= sprintPoints) {
        bestSum += pointsLength;
        selected.push(story);
      }
    }
    this.selectedStories = selected;
    this.noStoriesMessage = this.selectedStories.length === 0 ? 'No stories to be selected.' : null;
    if (this.selectedStories.length !== 0) {
      this.router.navigate(['/display'], { state: { selectedStories: this.selectedStories } });
    }
  }

  clearStories() {
    sessionStorage.removeItem('stories');
  }

  clearSelectedStories() {
    this.selectedStories = [];
  }

}
