import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BottomNavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tramp-routine-builder';
}
