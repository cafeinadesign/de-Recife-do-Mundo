import { Component } from '@angular/core';
import ePub, { Book, Rendition } from 'epubjs';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // title;
  book: Book;
  rendition: Rendition;
  pagina = 0;
  capitulo = 0;
  paginacao = 'Capa';
  constructor(public modalController: ModalController) {
    this.book = ePub('assets/de_Recife_do Mundo.epub');
    /*this.book.loaded.metadata.then((dados) => {
      this.title = dados.title;
    });*/
    this.inicia();
  }
  inicia() {
    this.rendition = this.book.renderTo('area', {
      flow: 'auto',
      width: '100%',
      height: '100%',
    });
    this.rendition.display().then(() => {
      this.pagina = 0;
      this.titulo();
    });
  }
  home() {
    this.rendition.destroy();
    this.inicia();
    // const home = this.rendition.location.start;
    // this.rendition.located()
    // console.log(this.rendition.currentLocation().end.index);
  }
  prev() {
    this.rendition.prev().then(() => {
      this.pagina = this.pagina - 1;
      this.capitulo = this.rendition.currentLocation().end.index;
      this.titulo();
    });
  }
  next() {
    this.rendition.next().then(() => {
      this.pagina = this.pagina + 1;
      this.capitulo = this.rendition.currentLocation().end.index;
      console.log(this.rendition.currentLocation());
      this.titulo();
      // console.log(this.rendition.currentLocation().end.index);
    });
  }
  titulo() {
    switch (this.capitulo) {
      case 0:
        this.paginacao = 'Capa';
        break;
      case 1:
        this.paginacao = 'Índice';
        break;
      case 2:
        this.paginacao = 'Artista';
        break;
      case 3:
        this.paginacao = 'Prefácil';
        break;

      default:
        this.paginacao =
          'Cap#' +
          (this.capitulo - 3) +
          ' (' +
          this.rendition.currentLocation().end.displayed.page +
          '/' +
          this.rendition.currentLocation().end.displayed.total +
          ')';
        break;
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
    });
    return await modal.present();
  }
}
