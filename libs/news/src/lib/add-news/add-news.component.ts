import { AuthenticationService } from '@football/shared';
import { News, ClubMeta } from './../modals/news';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { ClubDetailsService } from '../services/club-details.service';
import { FileUpload } from '../modals/upload-file';
import { Subject, Observable } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  mode = 'edit' // by default the mode is add but if the input has been given then it should be edit.
  // the input is used when this component is used as a child component in the news edit component, so that
  // add component can be used to achive edit if pass the news data.
  @Input()
  set newsData(newsData) {
    if (newsData) {
      this.mode = 'edit'
    }
  }
  submitting = false;
  selectedFiles: FileList | null;
  createdNewsKey: any = null;
  // Declare 3 sections with 2 separate forms 1- news content, 2- tagged clubs and sports type, 3- upload image - this doesn't need a form.
  articleAddFrom: FormGroup;
  // To render the relatedSports section.
  sportsType: Array<any> = [
    'football',
    'cricket',
    'basketball',
    'tug of war',
    'badminton',
    'other'
  ];
  selectedSports = {}; // this holds the user selected sports for the news
  clubSearchResults$: Observable<Array<any>>; // this refers to the search result array for clubs based on user typed input
  taggedClubs: ClubMeta[] = []; // array of objects which has club name and club unique id.

  someClubs = [
    { name: 'new castle', id: 'eieire' },
    { name: 'manchester united', id: 'blah blah' }
  ]
  imageUrl = ''; // to map to the url preview after selecting image.
  searchTerm$ = new Subject<string>(); // rxjs subject declared to make the search function work.
  newsObject: News = {
    title: '',
    summary: '',
    createdDate: new Date(),
    content: '',
    relatedSports: {},
    taggedClubs: [],
    author: {}
  } // this holds the data of the whole news from client before submitting to the server so that it can be shown in the preview

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private newService: NewsService,
    private clubDetailService: ClubDetailsService,
    private route: Router,
    private auth: AuthenticationService
  ) {
    this.articleAddFrom = this.formBuilder.group({
      title: ['Sample title for the news', Validators.required],
      summary: [
        'Summary of the news article which is needed to show in teaser type components',
        [Validators.required, Validators.minLength(50)]
      ],
      content: [
        'html content which later will be replaced with editor item',
        Validators.required
      ]
    });
    this.clubSearchResults$ = this.clubDetailService.searchClubs(
      this.searchTerm$
    );

    // setInterval(()=> console.log(this.newsObject), 15000);
    // sample taggedclub populaton
    this.taggedClubs = [{ name: 'liverpool', id: 'eik323' },
    { name: 'barca', id: 'eik323' }

    ]

    this.auth.user$.subscribe(
      res => {
        console.log('response ')
        console.log(res)
        this.newsObject.author = {
          name: res.displayName,
          uid: res.uid,
          photoUrl: res.photoUrl
        }
      }
    )

  }



  ngOnInit() {
    // get all the club details in id and value.
    this.clubDetailService.getAllclubs().subscribe(res => {
      console.log(res);
      // this.clubList = res;

    });

    if (this.mode === 'edit') {
      this.articleAddFrom.patchValue({ title: 'editing the content' });
    }


    // if(true) {
    //   this.articleAddFrom.setValue({
    //     title: 'hello world the set value title',
    //     summary: 'the set value summary which is of lenght tooo hight tcoood cococ cococo',
    //     content: ''
    //   });

    //   setTimeout(() => {
    //     this.articleAddFrom.patchValue({content: 'the patched value contnet after 5 sec'})

    //   }, 5000);
    // }
  }


  submitNews() {
    this.submitting = true;
    // console.log(this.articleAddFrom);
    // const formValue = this.articleAddFrom.value;
    // // adding the related sports to the form value.
    // formValue['relatedSports'] = this.selectedSports;
    // formValue['taggedClubs'] = this.taggedClubs;
    const newsItem = this.newsObject;
    newsItem['image'] = '';
    newsItem['status'] = 'published';

    this.newService.createNews(newsItem).then(res => {
      if (res) {
        // save the news id in a local variable.
        this.createdNewsKey = res.id;
        if (this.selectedFiles && this.selectedFiles.length === 1) {
          this.uploadImage();
        }
        this.submitting = false;
        this.route.navigate(['news/list']);
      }
    });
  }

  fileSelection($event) {
    console.log($event.target.files);
    this.selectedFiles = ($event.target as HTMLInputElement).files;

    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]); // read file as data url
      reader.onload = event => {
        // called once readAsDataURL is completed
        this.imageUrl = event.target.result;
      };
    }
  }

  uploadImage() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      const currentUpload: FileUpload = new FileUpload(file.item(0));
      this.newService.uploadNewsImage(file.item(0)).then(res => {
        const downloadUrl = res.downloadURL;
        console.log(downloadUrl);
        // update the news with the new download URL
        this.newService.updateNewsAfterImageLoad(
          this.createdNewsKey,
          downloadUrl
        );
      });
    } else {
      console.error('No file found!');
    }
  }

  sportSelectionChange($event) {
    this.selectedSports[$event.source.name] = $event.checked;
    console.log(this.selectedSports);
  }

  randomClickEvent() {
      this.newsObject.title = this.articleAddFrom.get('title').value;
      this.newsObject.summary = this.articleAddFrom.get('summary').value;
      this.newsObject.createdDate = new Date();
      this.newsObject.content = this.articleAddFrom.get('content').value;
      this.newsObject.taggedClubs = this.taggedClubs;
      this.newsObject.relatedSports = this.selectedSports;
      this.newsObject.image = this.imageUrl ? this.imageUrl : null;
    console.log(this.newsObject)
  }

  clubTagToggle($event, club) {
    console.log($event, club)
    if ($event.checked) {
      this.taggedClubs.push(club);
    } else {

      const index = this.taggedClubs.indexOf(club);

      if (index !== -1) {
        this.taggedClubs.splice(index, 1);
      }
    }

  }
}
