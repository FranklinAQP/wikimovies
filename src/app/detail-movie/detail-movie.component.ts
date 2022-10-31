import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cast } from '../core/models/credits.model';
import { MovieModel } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {
  movie?: MovieModel;
  credits?: Cast[];
  constructor(
    private movieService: MovieService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (params: Params) => {
        const idMovie: string = params['idMovie'];
        this.movieService.getMovieById(idMovie).subscribe({
          next: (response) => {
            this.movie = response;
          },
        });
        this.movieService.getCreditsId(idMovie).subscribe({
          next: (response) => {
            this.credits = response.cast;
            //this.credits = this.credits?.filter((item) => !!item.profile_path)
          }
        });
      },
    });
  }
}
