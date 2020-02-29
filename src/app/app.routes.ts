import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StackComponent} from './stack/stack.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {ExperienceComponent} from './experience/experience/experience.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'stack', component: StackComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'experience', component: ExperienceComponent}
];

export const globalRoutes = RouterModule.forRoot(appRoutes);
