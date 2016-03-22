//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-an-array-of-images
//
//
import image_src from './image_src';
import image_type from './image_type';
import image_sizes from './image_sizes';
import image_density from './image_density';

export default function icons ({key, manifest, manifestUrl, logger: _logger}) {

  let logger = _logger(key);

  // step 1
  let images = [];

  // step 2
  let descriptor = Object.getOwnPropertyDescriptor(manifest, key);
  if (typeof descriptor === "undefined") {
    logger.warn(`${key} is empty.`);
    // step 2.2
    return void 0;
  }
  let unprocessedImages = descriptor.value;

  // step 3
  if (Array.isArray(unprocessedImages)) {

    // step 3.1
    let potentialImages = unprocessedImages.filter(item => {
      if (item.hasOwnProperty("src")) return true;
      logger.warn(`${JSON.stringify(item)} has no field src`);
      return false;
    });

    potentialImages.map(image => {

      // input image string
      // for warnings
      const imgstr = JSON.stringify(image);

      // step 3.2.1
      let src = image_src({image, manifestUrl, logger: _logger, key});

      // step 3.2.2
      if (typeof src === "undefined") {
        logger.warn(`${imgstr} - src parsing failed`);
        return;
      }

      // step 3.3.3
      let resultImage = {
        src: void 0, type: void 0, sizes: void 0, density: void 0
      };

      // step 3.3.4
      resultImage.src = src;

      // step 3.3.5
      let type = image_type({image, logger: _logger, key});

      // step 3.3.6
      if (typeof type === "undefined")
        logger.warn(`${imgstr} - type parsing failed`);
      else
        resultImage.type = type;

      // step 3.3.7
      let sizes = image_sizes({image, logger: _logger, key});

      // step 3.3.8
      if (typeof sizes === "undefined")
        logger.warn(`${imgstr} - sizes parsing failed`);
      else
        resultImage.sizes = sizes;

      // step 3.3.9
      let density = image_density({image, logger: _logger, key});

      // step 3.3.10
      if (typeof density === "undefined")
        logger.warn(`${imgstr} - density parsing failed`);
      else
        resultImage.density = density;

      // step 3.3.11
      images.push(resultImage);

    });
  } else {
    // step 4
    let type = typeof unprocessedImages;
    if (type === "undefined")
      logger.warn(`Type ${type} is not supported`);
  }

  return images;

}
