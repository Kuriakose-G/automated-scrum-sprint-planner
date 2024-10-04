import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-story-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './story-form.component.html',
  styleUrl: './story-form.component.css'
})
export class StoryFormComponent {

  storyForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
    private service: StoryService,
    private router: Router
  ) {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      points: this.fb.array([this.fb.control('')]) 
    });
  }

  get points(): FormArray {
    return this.storyForm.get('points') as FormArray;
  }

  addPoint() {
    this.points.push(this.fb.control(''));
  }

  removePoint(index: number) {
    this.points.removeAt(index); 
  }

  addStory() {
    if (this.storyForm.valid) {
      const newStory = this.storyForm.value;
      const error = this.service.addStory(newStory);
      if (error) {
        this.errorMessage = error;
      } else {
        this.errorMessage = null;
        this.router.navigate(['']);
      }
    }
  }
  
}
