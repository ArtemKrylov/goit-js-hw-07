import { galleryItems } from "./gallery-items.js";

(() => {
  const galleryEl = document.querySelector(".gallery");

  const galleryItemsHTMLString = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
					<a class="gallery__link" href="${original}">
						<img class="gallery__image" src="${preview}" alt="${description}" loading="lazy" data-source="${original}" />
					</a>
				</li>`
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", galleryItemsHTMLString);

  const onGalleryItemClick = (event) => {
    event.preventDefault();
    const { target } = event;
    if (target.nodeName !== "IMG") return;

    //creating basicLightbox instance
    const instance = basicLightbox.create(`
      <div class="modal">
          <img src="${target.dataset.source}" alt="${target.alt}" />
      </div>
    `);
    instance.show();

    //when modal window is open adding Ecs keydown event listener on document
    const onEscKeydown = (event) => {
      //checking if Esc pressed
      if (event.code !== "Escape") return;
      //if Esc is pressed closing modal window and removing Esc keydown event listener from document
      instance.close();
      document.removeEventListener("keydown", onEscKeydown);
    };
    document.addEventListener("keydown", onEscKeydown);
  };

  galleryEl.addEventListener("click", onGalleryItemClick);
})();
