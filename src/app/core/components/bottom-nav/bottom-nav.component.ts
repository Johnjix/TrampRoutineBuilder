import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavComponent {

}
