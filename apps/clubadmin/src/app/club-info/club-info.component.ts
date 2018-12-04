import { AuthenticationService } from '@football/shared';
import { ClubAdminService } from './../services/club-admin.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NewsCommonService } from '@football/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'football-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  clubBasicForm: FormGroup;
  clubManagementForm: FormGroup;
  clubAchivementForm: FormGroup;
  user: any = null;
  submitting = false;
  clubInfoLoading;
  club = null;
  managements = [];
  achievements = [];
  clubId = '5ZRSBNKpB1u2OJ0urK0w';
  news = {
    banner:
      'http://www.clubcontrol.co.uk/wp-content/uploads/2016/01/Club-Control-Main-Banner-BG.jpg',
    logo:
      'http://diylogodesigns.com/blog/wp-content/uploads/2015/12/creative-football-club-logo-design-uk-14.png'
  };

  sampleIter = null;
  id = '';
  clubNews$: Observable<any[]>;
  constructor(
    private _fb: FormBuilder,
    public clubAdminService: ClubAdminService,
    public auth: AuthenticationService
  ) {
    this.clubBasicForm = this._fb.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      contact: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ],
      address: this._fb.group({
        line1: ['', [Validators.required]],
        line2: '',
        pin: ['', [Validators.required]]
      })
    });

    this.clubAchivementForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.clubManagementForm = this._fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sampleIter = 'skdflsdjflkjsdfsdf'.split('');
    this.clubInfoLoading = true;
    this.auth.user$
      .pipe(
        switchMap(user => {
          this.user = user;
          this.clubId = user.permission.clubId;
          this.getClubManagement();
          this.getClubAchivements();
          return this.clubAdminService.getClubById('OeE0VAUfqkVP04IXwoUD');
        })
      )
      .subscribe(club => {
        this.club = club;
        this.clubBasicForm.patchValue(club);
        this.clubInfoLoading = false;
      });
  }

  get contactNumber() {
    return this.clubBasicForm.get('contact');
  }

  onBasicFormSubmit() {
    this.submitting = true;
    this.clubAdminService
      .updateClubInfo(this.club.id, this.clubBasicForm.value)
      .then(() => (this.submitting = false))
      .catch(err => {
        console.log(err);
        this.submitting = false;
      });
  }
  getClubManagement() {
    this.clubAdminService
      .getClubItemInfo('management', this.clubId)
      .subscribe(managements => {
        this.managements = managements;
      });
  }
  getClubAchivements() {
    this.clubAdminService
      .getClubItemInfo('achievements', this.clubId)
      .subscribe(achievements => {
        this.achievements = achievements;
      });
  }
  addClubSubItem(subItem, value) {
    console.log(value);
    value['createdDate'] = new Date();
    this.clubManagementForm.reset();
    this.clubAchivementForm.reset();
    this.clubAdminService
      .addClubItemInfo(subItem, this.clubId, value)
      .then(() => console.log(`club ${subItem} added successfully.`))
      .catch(error => console.log(error));
  }
  deleteFromClubSubItem(subItem, item) {
    if (confirm('Do you really want to delete this')) {
      this.clubAdminService
        .deleteItemInfo(subItem, this.clubId, item)
        .then(() => console.log(`club ${subItem} added successfully.`))
        .catch(err => console.log(err));
    }
  }
}
