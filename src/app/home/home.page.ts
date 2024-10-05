import { Component, inject } from '@angular/core';
import {
  IonAlert,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent, IonAvatar, IonBadge
} from '@ionic/angular/standalone';

// Import Service
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonAvatar,
    IonThumbnail,
    DatePipe,
    RouterLink,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
})
export class HomePage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;

          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);

          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.movies.push(...res.results);

          if(event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        }
      })
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
