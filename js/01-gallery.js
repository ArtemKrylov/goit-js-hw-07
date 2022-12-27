import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
let currentIndex = 0;

const instance = basicLightbox.create(
  `
      <div class="modal">
          <img src="" alt="" />
      </div>
    `,
  {
    onShow: (instance) => {
      document.addEventListener("keydown", pressKeyBoard);
    },
    onClose: (instance) => {
      document.removeEventListener("keydown", pressKeyBoard);
    },
  }
);

const galleryItemsHTMLString = galleryItems
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
					<a class="gallery__link" href="${original}">
						<img class="gallery__image" src="${preview}" alt="${description}" loading="lazy" data-source="${original}" data-index="${index}" />
					</a>
				</li>`
  )
  .join("");
galleryEl.insertAdjacentHTML("beforeend", galleryItemsHTMLString);

const onGalleryItemClick = (event) => {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== "IMG") return;
  currentIndex = Number(target.dataset.index);

  //creating basicLightbox instance
  const elem = instance.element().querySelector("img");
  elem.src = target.dataset.source;

  instance.show();
};

galleryEl.addEventListener("click", onGalleryItemClick);

//when modal window is open adding Ecs keydown event listener on document
function pressKeyBoard(event) {
  //checking if Esc pressed
  console.log("Hello", event.code);
  if (event.code === "Escape") {
    instance.close();
  }
  if (event.code === "ArrowRight") {
    currentIndex += 1;
    if (currentIndex === galleryItems.length) {
      currentIndex = 0;
    }
    const elem = instance.element().querySelector("img");
    elem.src = galleryItems[currentIndex].original;
  }
  if (event.code === "ArrowLeft") {
    currentIndex -= 1;
    if (currentIndex === -1) {
      currentIndex = galleryItems.length - 1;
    }
    const elem = instance.element().querySelector("img");
    elem.src = galleryItems[currentIndex].original;
  }
}
