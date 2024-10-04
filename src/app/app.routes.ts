import { Routes } from '@angular/router';
import { StorylistComponent } from './components/storylist/storylist.component';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { SprintDisplayComponent } from './components/sprint-display/sprint-display.component';
import { DisplayComponent } from './components/display/display.component';

export const routes: Routes = [
    { path:'', component:StorylistComponent },
    { path:'form', component:StoryFormComponent },
    { path:'sprint', component:SprintDisplayComponent },
    { path:'display', component:DisplayComponent }
];
