import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { ClubDetailsService } from '../services/club-details.service';
import { FileUpload } from '../modals/upload-file';

@Component({
  selector: 'add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  submitting = false;
  startDate = new Date();

  title = new FormControl('', [Validators.required]);
  // createdDate = new FormControl(new Date(), [Validators.required]);
  summary = new FormControl('test content to make it 50, hello super duper world', [Validators.required, Validators.minLength(50)]);
  tagged_clubs = new FormControl('', [Validators.required]);
  content = new FormControl('New article details..', Validators.minLength(5));

  selectedFiles: FileList | null;
  createdNewsKey: any = null;
  clubList = [];

  // Declare 3 sections with 2 separate forms 1- news content, 2- tagged clubs and sports type, 3- upload image - this doesn't need a form.
  articleAddFrom: FormGroup;
  extraDataForm: FormGroup;

  // To render the relatedSports section.
  selectedSports = {};

  sportsType: Array<any> = ['football', 'cricket', 'basketball', 'tug of war', 'badminton', 'other'];

  constructor(private formBuilder: FormBuilder,
    private newService: NewsService,
    private clubDetailService: ClubDetailsService,
    private route: Router) {

      this.articleAddFrom = this.formBuilder.group({
        title: this.title,
        summary: this.summary,
        content: this.content,
        tagged_clubs: this.tagged_clubs,

      });

      this.extraDataForm = this.formBuilder.group({
        taggedClubs: new FormControl(''),
        relatedSports: new FormControl(this.sportsType)
      })


     }

  ngOnInit() {
    // get all the club details in id and value.
    this.clubDetailService.getAllclubs()
      .subscribe(res => {
        console.log(res);
        this.clubList = res;
      });

      if(true) {
        this.articleAddFrom.setValue({
          title: 'hello world the set value title',
          summary: 'the set value summary which is of lenght tooo hight tcoood cococ cococo',
          tagged_clubs: '',
          content: ''
        });

        setTimeout(() => {
          this.articleAddFrom.patchValue({content: 'the patched value contnet after 5 sec'})

        }, 5000);
      }
  }


  submitNews() {
    this.submitting = true;
    console.log(this.articleAddFrom);
    // adding the related sports to the form value.
    this.articleAddFrom.value['relatedSports'] = this.selectedSports;
    this.newService.createNews(this.articleAddFrom.value)
      .then(res => {
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

  url='';

  fileSelection($event) {
    console.log($event.target.files);
    this.selectedFiles = ($event.target as HTMLInputElement).files;

    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.url = event.target.result;
      }
    }
  }

  uploadImage() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      const currentUpload: FileUpload = new FileUpload(file.item(0));
      this.newService.uploadNewsImage(file.item(0))
        .then(res => {
          const downloadUrl = res.downloadURL;
          console.log(downloadUrl);
          // update the news with the new download URL
          this.newService.updateNewsAfterImageLoad(this.createdNewsKey, downloadUrl);

        });
    } else {
      console.error('No file found!');
    }
  }

  sportSelectionChange($event) {
    this.selectedSports[$event.source.name] = $event.checked;
    console.log(this.selectedSports);
  };

  listSelection($event) {
    console.log($event);
    console.log($event.selectedOptions)
  }

}
