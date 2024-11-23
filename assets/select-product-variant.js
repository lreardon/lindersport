function selectProductColor(color) {
  const currentVariantElement = document.querySelector('form select option:checked');
  const currentColor = currentVariantElement.dataset.color || null;
  const currentSize = currentVariantElement.dataset.size || null;
  
  const variantId = selectVariantByColorAndSize({color: color, size: currentSize});
  if (variantId == null) {
    return;
  }

  const titleSpan = document.querySelector('span.product__title-variant');
  titleSpan.innerText = color;

  const clickedSwatch = document.querySelector(`.product-swatch[data-color="${color}"]`);
  if (clickedSwatch.classList.contains('active')) {
    // Do nothing if this swatch is already the active one.  
    return;
  }
  
  const swatches = document.querySelectorAll('.product-swatch');
  swatches.forEach(swatch => swatch.classList.remove('active'));  
  if (clickedSwatch) {
    clickedSwatch.classList.add('active');
  }

  switchActiveGallery(variantId);

  // Update the size availability
  const productVariantOfColorElements = document.querySelectorAll(`form select option[data-color="${color}"]`);
  const productVariantOptions = document.querySelectorAll(`form select option`);
  const availableVariantOptions = [...productVariantOptions].filter((option) => option.dataset.available == "true");
  const availableVariantIds = availableVariantOptions.map((option) => option.value);
  
  // If a size is unavailable in the current color, mark it unavailable, otherwise make sure it is available.
  for (let productVariant of productVariantOfColorElements) {
    let size = productVariant.dataset.size;
    const correspondingSizeInput = document.querySelector(`.product__sizes .radio input[value="${size}"]`).closest('.radio');
    if (availableVariantIds.includes(productVariant.value)) {
      correspondingSizeInput.classList.remove('radio--sold-out');
    } else {
      correspondingSizeInput.classList.add('radio--sold-out');
      const inputs = correspondingSizeInput.getElementsByTagName('input'); // should contain exactly one input
      if (inputs.length > 0) { // should always be true
          let input = inputs[0];
          input.setAttribute('disabled', '');
          input.removeAttribute('checked');
      }
    }
  }
}

function selectSize(size) {
  const currentVariantElement = document.querySelector('form select option:checked');
  const currentSize = currentVariantElement.dataset.size;
  if (currentSize == size) {
    return;
  }
  
  const currentColor = currentVariantElement.dataset.color;
  
  selectVariantByColorAndSize({color: currentColor, size: size});
}

function selectVariantByColorAndSize({color, size}) {
  const oldVariant = document.querySelector('form select option:checked');
  oldVariant.removeAttribute('selected');
  
  let selector = `form select option`;
  if (color != null) {
    selector += `[data-color="${color}"]`;
  }
  if (size != null) {
    selector += `[data-size="${size}"]`;
  }
  
  const newVariant = document.querySelector(selector);
  newVariant.setAttribute('selected', true);

	console.log(newVariant.dataset);
	isAvailable = newVariant.dataset.available == "true";
  
  const variantId = newVariant.value;
  switchActiveProductImage(variantId);
	switchActiveProductActionsButton(isAvailable);

  return variantId;
}

function switchActiveGallery(variantId) {
  // Note the current swiper index, which we will sync with the next one
  const prevGallerySwiperIndex =  document.querySelector(`product-gallery:not(.hidden)`).swiper.activeIndex;
  
  // Switch the visibility to the appropriate slider
  const galleries = document.querySelectorAll('product-gallery');
  galleries.forEach(gallery => gallery.classList.add('hidden'));
  const activeGallery = document.querySelector(`product-gallery[data-variant-id="${variantId}"]`);
  activeGallery.classList.remove('hidden');

  // Synchronize the swiper index based on the previous location
  // const activeSwiper = activeGallery.swiper;
  activeGallery.swiper.slideTo(prevGallerySwiperIndex, 0);
}

function switchActiveProductImage(variantId) {
  document.querySelectorAll(`.product__image`).forEach((e) => e.classList.add('hidden'));
  document.querySelector(`.product__image[data-variant-id="${variantId}"]`).classList.remove('hidden');
}

function switchActiveProductActionsButton(variantId) {
	const productActionsButtons = document.querySelectorAll('.product__actions');
	productActionsButtons.forEach((e) => e.classList.add('hidden'));
	const activeProductActionsButton = document.querySelector(`.product__actions[data-variant-id="${variantId}"]`);
  activeProductActionsButton.classList.remove('hidden');
}