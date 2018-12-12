import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  generateTags(tags) {
    // default values
    tags = {
      title: 'Timeout Sports - sevens football',
      description: 'Local Sports news for all',
      image: 'https://angularfirebase.com/images/logo.png',
      slug: '',
      ...tags
    };

    // Set a title
    this.titleService.setTitle(tags.title);

    // Set meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: tags.description
    });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Time Out web'
    });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({
      property: 'og:description',
      content: tags.description
    });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://clubuser.herokkuapp.com/news/detail/${tags.id}`
    });
  }
}
