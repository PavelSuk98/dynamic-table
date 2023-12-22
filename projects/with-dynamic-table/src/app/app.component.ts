import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { userConfiguration } from './models/user.dto';
import { MockDataService } from './services/mock-data.service';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DynamicTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'with-dynamic-table';

  tableConfiguration = userConfiguration;

  data = inject(MockDataService).getUsers();
}
