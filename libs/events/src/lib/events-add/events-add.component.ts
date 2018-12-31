import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthenticationService } from '@football/shared';
import { EventAdminService } from '../services/event-admin.service';

@Component({
  selector: 'football-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {
  eventForm: FormGroup;
  submitting = false;
  isEditing = false;
  loggedUser = null;
  createdEventKey = null;
  editorConfig = editorConfiguation;
  sportsType: Array<any> = [
    'football',
    'cricket',
    'basketball',
    'tug of war',
    'badminton',
    'other'
  ];
  selectedSports = {}; // this holds the user selected sports for the news

  constructor(
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public auth: AuthenticationService,
    public eventService: EventAdminService,
    public router: Router
  ) {}

  ngOnInit() {
    console.log('event add is loaded');

    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          console.log(id);
          if (id) {
            this.isEditing = true;
            this.createdEventKey = id;

            return this.eventService.getEvent(id);
          }
          return of(null);
        })
      )
      .subscribe(event => {
        if (event) {
          if (event.date) {
            const eventDate = event.date.toDate();
            event.date = eventDate;
          }
          if (event.expiryDate) {
            const expiryDate = event.expiryDate.toDate();
            event.expiryDate = expiryDate;
          }

          this.eventForm.patchValue(event);
          if (event.relatedSports) {
            this.selectedSports = event.relatedSports;
          }

          console.log(this.eventForm);
          // this.imageUrl = news.image ? news.image : ''; //'https://picsum.photos/200/300';
        } else {
          console.log('something wrong in gettting news');
        }
      });

    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      date: '',
      expiryDate: '',
      content: ''
    });

    this.auth.user$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  isSportsSelected(sport) {
    if (this.selectedSports[sport]) {
      return true;
    }
    return false;
  }

  sportSelectionChange($event) {
    this.selectedSports[$event.source.name] = $event.checked;
    console.log(this.selectedSports);
  }

  submitEvent() {
    const eventData = this.eventForm.value;
    eventData['mainClub'] = {
      name: this.loggedUser.permission.club,
      id: this.loggedUser.permission.clubId
    };
    eventData['author'] = {
      name: this.loggedUser.fullName,
      id: this.loggedUser.uid
    };

    eventData['relatedSports'] = this.selectedSports;
    eventData['status'] = 'draft';
    console.log(eventData);
    this.eventService
      .createEvent(eventData)
      .then(res => this.router.navigate(['events']))
      .catch(err => console.log('something went wrong while creating event.'));
  }
  updateEvent() {
    const eventUpdateData = this.eventForm.value;
    eventUpdateData['relatedSports'] = this.selectedSports;
    this.eventService
      .updateEvent(this.eventForm.value, this.createdEventKey)
      .then(res => console.log('update was successfull'));
  }
}

export const editorConfiguation: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '10rem',
  minHeight: '5rem',
  placeholder: 'ദയവായി ഇവിടെ വിശദാംശങ്ങൾ ചേർക്കുക',
  translate: 'no',
  uploadUrl: 'v1/images', // if needed
  customClasses: [
    // optional
    {
      name: 'quote',
      class: 'quote'
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1'
    }
  ]
};
