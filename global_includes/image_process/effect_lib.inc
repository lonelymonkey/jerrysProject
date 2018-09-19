<?php
use Jaguar\Canvas,
        Jaguar\CanvasInterface,
        Jaguar\Action\AbstractAction,
        Jaguar\Action\EdgeDetection,
        Jaguar\Action\Color\Negate,
        Jaguar\Action\Color\Grayscale,
        Jaguar\Action\Color\Boost,
        Jaguar\Action\Color\Gamma,
        Jaguar\Action\Color\Sepia,
        Jaguar\Action\GraySketchy,
        Jaguar\Action\Sketchy,
        Jaguar\Action\Posterize,
        Jaguar\Action\Blur\SelectiveBlur,
        Jaguar\Util,
        Jaguar\Action\Preset\Monopin,
        Jaguar\Action\Preset\Dreamy,
        Jaguar\Transformation;
require_once 'vendor/autoload.php';
if (!class_exists('PencilAction')) {
  class PencilAction extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {

                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new Grayscale())
                                  ->apply(new EdgeDetection(EdgeDetection::LAPLACIAN_FILTER3))
                                  ->apply(new Negate());
          }

  }
}
if (!class_exists('paint_enhance')) {
  class paint_enhance extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new Boost())
                                  ->apply(new SelectiveBlur())
                                  ->apply(new Posterize(5));
          }

  }
}
if (!class_exists('paint_enhance')) {
  class paint_enhance extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new Boost())
                                  ->apply(new SelectiveBlur())
                                  ->apply(new Posterize(5));
          }

  }
}
if (!class_exists('pencil_gray')) {
  class pencil_gray extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new GraySketchy());
          }

  }
}
if (!class_exists('color_sketch')) {
  class color_sketch extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new Gamma(4));
          }

  }
}
if (!class_exists('sepia_style')) {
  class sepia_style extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation
                                  ->apply(new Sepia());
          }

  }
}
if (!class_exists('Vintage_effect')) {
  class Vintage_effect extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->overlay(new Canvas(Util::getResourcePath('/Preset/vignette.gd2')));
          }

  }
}
if (!class_exists('scratch_effect')) {
  class scratch_effect extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->overlay(new Canvas(Util::getResourcePath('/Preset/scratch.gd2')));
          }

  }
}
if (!class_exists('noise_effect')) {
  class noise_effect extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->overlay(new Canvas(Util::getResourcePath('/Preset/noise.gd2')));
          }

  }
}
if (!class_exists('Monopin_effect')) {
  class Monopin_effect extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->apply(new Monopin());
          }

  }
}
if (!class_exists('Dreamy_effect')) {
  class Dreamy_effect extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->apply(new Dreamy());
          }

  }
}

// $transformation = new Transformation(new Canvas('360.jpeg'));
// $transformation->apply(new PencilAction())
//                 ->getCanvas()
//                 ->save('360-pencil-actioasdnasd.jpg');

?>
