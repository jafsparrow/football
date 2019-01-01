import { async } from '@angular/core/testing';
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
import { Router, ActivatedRoute } from '@angular/router';
import { ClubDetailsService } from '../services/club-details.service';
import { FileUpload } from '../modals/upload-file';
import { Subject, Observable, of } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { switchMap, finalize, tap } from 'rxjs/operators';

// image resize
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'news-add',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  editorConfig = editorConfiguation;
  user;
  submitting = false;
  isEditing = false;
  selectedFiles: FileList | null;
  createdNewsKey: any = null; // same varible is used to store key of new while it is editing. so it is refered in updateNews() method as well.
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
  // taggedClubs: ClubMeta[] = []; // array of objects which has club name and club unique id.
  taggedClubObject = {};
  someClubs = [
    { name: 'new castle', id: 'eieire' },
    { name: 'manchester united', id: 'blah blah' }
  ];
  imageUrl = ''; // to map to the url preview after selecting image.
  searchTerm$ = new Subject<string>(); // rxjs subject declared to make the search function work.
  newsObject: News = {
    title: '',
    summary: '',
    createdDate: new Date(),
    content: '',
    relatedSports: {},
    taggedClubs: {},
    author: {}
  }; // this holds the data of the whole news from client before submitting to the server so that it can be shown in the preview
  isSearchingForClub = false;
  constructor(
    private formBuilder: FormBuilder,
    private newService: NewsService,
    private clubDetailService: ClubDetailsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private ng2ImgMax: Ng2ImgMaxService
  ) {
    // console.log('news add component');
    this.articleAddFrom = this.buildForm();
    this.clubSearchResults$ = this.clubDetailService
      .searchClubs(this.searchTerm$)
      .pipe(
        tap(res => {
          this.isSearchingForClub = false;
        })
      );

    this.auth.user$.subscribe(res => {
      this.user = res;
      this.newsObject.author = {
        name: res.displayName,
        uid: res.uid,
        photoUrl: res.photoUrl
      };
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          if (id) {
            // console.log(id);
            this.isEditing = true;
            this.createdNewsKey = id;
            return this.newService.getDetailedNews(id);
          }
          return of(null);
        })
      )
      .subscribe(news => {
        if (news) {
          // console.log(news);
          this.articleAddFrom.patchValue(news);
          this.imageUrl = news.image ? news.image : ''; //'https://picsum.photos/200/300';
        } else {
          console.log('something wrong in gettting news');
        }
      });
  }

  buildForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', [Validators.required, Validators.minLength(50)]],
      content: ['', Validators.required]
    });
  }

  get taggedClubs() {
    return Object.keys(this.taggedClubObject);
  }
  fileSelection($event) {
    console.log($event.target.files);
    this.selectedFiles = ($event.target as HTMLInputElement).files;

    if ($event.target.files && $event.target.files[0]) {
      const image = $event.target.files[0];
      this.ng2ImgMax.resizeImage(image, 600, 10000).subscribe(
        result => {
          console.log(result);
          const reader = new FileReader();
          reader.readAsDataURL(result); // read file as data url
          reader.onload = event => {
            // called once readAsDataURL is completed
            this.imageUrl = event.target.result;
          };
        },
        error => {
          console.log('😢 Oh no!', error);
          return null;
        }
      );

      // const reader = new FileReader();
      // reader.readAsDataURL($event.target.files[0]); // read file as data url
      // reader.onload = event => {
      //   // called once readAsDataURL is completed
      //   this.imageUrl = event.target.result;
      // };
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
    this.newsObject.taggedClubs = this.taggedClubObject;
    this.newsObject.relatedSports = this.selectedSports;
    this.newsObject.image = this.imageUrl ? this.imageUrl : null;
    // console.log(this.newsObject);
  }
  // this method adds the tagged club to array.
  // clubTagToggle($event, club) {
  //   if ($event.checked) {
  //     this.taggedClubs.push(club);
  //   } else {
  //     const index = this.taggedClubs.indexOf(club);

  //     if (index !== -1) {
  //       this.taggedClubs.splice(index, 1);
  //     }
  //   }
  // }

  clubTagToggle($event, club) {
    if ($event.checked) {
      this.taggedClubObject[club.id] = {
        id: club.id,
        name: club.name,
        tier: club.tier
      };
    } else {
      if (this.taggedClubObject[club.id]) {
        delete this.taggedClubObject[club.id];
      }
    }
  }
  submitNews() {
    this.submitting = true;
    const newsItem = this.newsObject;
    newsItem['image'] = '';
    newsItem['status'] = 'draft';
    newsItem['mainClub'] = {
      id: this.user.permission.clubId,
      name: this.user.permission.club,
      tier: this.user.permission.tier ? this.user.permission.tier : 'none'
    };

    this.newService.createNews(newsItem).then(res => {
      if (res) {
        // save the news id in a local variable.
        this.createdNewsKey = res.id;
        if (this.selectedFiles && this.selectedFiles.length === 1) {
          this.uploadImage().subscribe(downLoadUrl => {
            if (downLoadUrl) {
              this.updateNewsImage(downLoadUrl).then(() => {
                this.submitting = false;
                this.route.navigate(['/news/view', this.createdNewsKey]);
              });
            } else {
              console.log('error in upload the file.');
              this.submitting = false;
            }
          });
        }
        this.submitting = false;
        this.route.navigate(['/news/view', this.createdNewsKey]);
      }
    });
  }
  updateNews() {
    this.submitting = true;
    // string down the image property from newsOjbect.
    //  as this is not needed while updating.

    delete this.newsObject['image'];
    this.newService
      .updateNews(this.newsObject, this.createdNewsKey)
      .then(() => {
        if (this.selectedFiles && this.selectedFiles.length === 1) {
          this.uploadImage().subscribe(downLoadUrl => {
            if (downLoadUrl) {
              this.updateNewsImage(downLoadUrl).then(() => {
                this.submitting = false;
                this.route.navigate(['/news/view', this.createdNewsKey]);
              });
            } else {
              console.log('error in upload the file.');
              this.submitting = false;
            }
          });
        } else {
          console.log('no files are selected to upload.');
          this.submitting = false;
        }
      });
  }
  uploadImage() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      // console.log('upload image fucntion.');
      // console.log(file.item(0));
      // const currentUpload: FileUpload = new FileUpload(file.item(0));
      const selectedImage = file[0];
      return this.ng2ImgMax.resizeImage(selectedImage, 600, 10000).pipe(
        switchMap(result => {
          console.log('result', result);
          const uploadImage = new File([result], result.name);
          return this.newService.uploadNewsImage(uploadImage);
        })
      );
      // return this.ng2ImgMax.resizeImage(selectedImage, 600, 300).subscribe(
      //   result => {
      //     const uploadImage = new File([result], result.name);
      //     return this.newService.uploadNewsImage(uploadImage);
      //   },
      //   error => {
      //     console.log('😢 Oh no!', error);
      //     return of(null);
      //   }
      // );
    } else {
      console.error('No file found!');
      return of(null);
    }
  }

  testMe($event) {
    console.log($event);
  }

  updateNewsImage(downLoadUrl) {
    return this.newService.updateNewsAfterImageLoad(
      this.createdNewsKey,
      downLoadUrl
    );
  }

  searchClubs(inputText) {
    this.isSearchingForClub = true;
    this.searchTerm$.next(inputText);
  }
}

export const editorConfiguation: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '25rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
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

// here is the code before adding the image resize compress thing. Just keeping it safe.
// submitNews() {
//   this.submitting = true;
//   const newsItem = this.newsObject;
//   newsItem['image'] = '';
//   newsItem['status'] = 'draft';
//   newsItem['mainClub'] = {
//     id: this.user.permission.clubId,
//     name: this.user.permission.club,
//     tier: this.user.permission.tier ? this.user.permission.tier : 'none'
//   };

//   this.newService.createNews(newsItem).then(res => {
//     if (res) {
//       // save the news id in a local variable.
//       this.createdNewsKey = res.id;
//       if (this.selectedFiles && this.selectedFiles.length === 1) {
//         this.uploadImage().subscribe(downLoadUrl => {
//           if (downLoadUrl) {
//             this.updateNewsImage(downLoadUrl).then(() => {
//               this.submitting = false;
//               this.route.navigate(['/news/view', this.createdNewsKey]);
//             });
//           } else {
//             console.log('error in upload the file.');
//             this.submitting = false;
//           }
//         });
//       }
//       this.submitting = false;
//       this.route.navigate(['/news/view', this.createdNewsKey]);
//     }
//   });
// }

// uploadImage() {
//   const file = this.selectedFiles;
//   if (file && file.length === 1) {
//     // console.log('upload image fucntion.');
//     // console.log(file.item(0));
//     const currentUpload: FileUpload = new FileUpload(file.item(0));
//     return this.newService.uploadNewsImage(file.item(0));
//   } else {
//     console.error('No file found!');
//     return of(null);
//   }
// }
