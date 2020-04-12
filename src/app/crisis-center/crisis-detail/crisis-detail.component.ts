import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';


@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService
  ) { }

  ngOnInit(): void {
    // this.route.data
    //   .subscribe((data: { crisis: Crisis }) => {
    //     this.editName = data.crisis.name;
    //     this.crisis = data.crisis;
    //   });
    this.getCrisis();
  }

  getCrisis(): void {
    this.route.paramMap.pipe(
      switchMap(
        (param: ParamMap) =>
          this.crisisService.getCrisis(param.get('id'))
        )
    )
    .subscribe( (crisis: Crisis) => {
      this.crisis = crisis;

    }
    );
  }
  // or
  // getCrisis(): void {
  //   this.crisisService.getCrisis(
  //     this.route.snapshot.paramMap.get('id')
  //   )
  //   .subscribe( crisis =>
  //     this.crisis = crisis
  //   );
  // }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    // or this.router.navigate(['/crisis-center', { id: crisisId, foo: 'foo' }]);
  }

}
