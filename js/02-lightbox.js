import { galleryItems } from "./gallery-items.js";

(() => {
  const galleryEl = document.querySelector(".gallery");
  const galleryItemsHTMLString = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
 				 	<img class="gallery__image" src="${preview}" alt="${description}" />
			 	</a>`
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", galleryItemsHTMLString);

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
})();
