import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-storylist',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './storylist.component.html',
  styleUrl: './storylist.component.css'
})
export class StorylistComponent {

  stories:any[] = [];
  expandedIndices: Set<number> = new Set();

  constructor(private router: Router,
    private service: StoryService
  ) {}

  ngOnInit() {
    this.getStories();
  }

  goToStoryForms(){
    this.router.navigate(['/form'])
  }

  goToSprintDisplay(){
    this.router.navigate(['/sprint'])
  }

  getStories(){
    this.stories = this.service.getStories()
  }

  toggleExpand(index: number) {
    if (this.expandedIndices.has(index)) {
      this.expandedIndices.delete(index);
    } else {
      this.expandedIndices.add(index);
    }
  }

}
