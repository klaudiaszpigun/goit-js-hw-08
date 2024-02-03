import { galleryItems } from './gallery-items.js';

// zmienna gallery to galeria zdjęć
const gallery = document.querySelector('.gallery');

// iteracja po tablicy metodą map, która przyjmuje jeden parametr, którym jest element tablicy, wynikiem tej pętli, jest tablica stringów ze znacznikami HTML
const listItems = galleryItems
  .map(
    galleryItem =>
      `<a class="gallery__item" href="${galleryItem.original}">
        <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
    </a>`
  )
  // metoda tablicowa .join() łączy całą tablicę w string, dzięki czemu, można te znaczniki podłączyć do kodu HTML
  .join('');

// dołączenie znaczników do kodu HTML
gallery.insertAdjacentHTML('afterbegin', listItems);

// użycie biblioteki SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
