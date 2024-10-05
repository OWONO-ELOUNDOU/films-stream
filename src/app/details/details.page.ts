import { Component, Input, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import Components
import { cashOutline, calendarOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonCardContent,
  IonLabel,
  IonItem,
  IonIcon
} from '@ionic/angular/standalone';

// Import Service
import { MovieService } from '../services/movie.service';

// Import Models
import { MovieResult } from '../services/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonCardContent,
    IonLabel,
    IonItem,
    IonIcon
  ]
})
export class DetailsPage {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
    })
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }

}
