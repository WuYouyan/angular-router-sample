import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
    ) { }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id'))
      )
    );
    // Alternative method without Observable : snapshot
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);
  }

  gotoHeroes(hero: Hero): void {
    const heroId = hero ? hero.id : null ;
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }


}
