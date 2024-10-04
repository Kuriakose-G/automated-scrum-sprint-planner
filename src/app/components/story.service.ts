import { Injectable } from '@angular/core';

interface Story {
  name: string;
  points: string[];
}

@Injectable({
  providedIn: 'root'
})

export class StoryService {

  private stories: Story[] = [];
  private storageKey = 'stories';

  constructor() { 
    const storedStories = sessionStorage.getItem(this.storageKey);
    if (storedStories) {
      this.stories = JSON.parse(storedStories);
    } else {
      this.stories = [];
    }
  }


  addStory(story: Story): string | null {  
    const duplicate = this.stories.find(s => s.name === story.name);
    if (duplicate) {
      return 'Story already exists!';
    }
    this.stories.push(story);
    this.saveStories(); 
    return null;
  }

  getStories(): Story[] {
    return this.stories;
  }

  removeStory(index: number): void {
    if (index >= 0 && index < this.stories.length) {
      this.stories.splice(index, 1);
      this.saveStories(); 
    }
  }

  private saveStories() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.stories));
  }
}
