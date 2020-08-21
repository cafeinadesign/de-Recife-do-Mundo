import { Component } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title;
  rendition: Rendition;
  constructor() {
    const book: Book = ePub(
      'assets/robertinho-de-recife-robertinho-do-mundo.epub'
    );
    book.loaded.metadata.then((dados) => {
      this.title = dados.title;
    });
    this.rendition = book.renderTo('area', {
      flow: 'auto',
      width: '100%',
      height: '100%',
    });
    this.rendition.display();
  }
  prev() {
    this.rendition.prev();
  }
  next() {
    this.rendition.next();
  }
}
