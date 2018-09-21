<?php
use Jaguar\Canvas,
        Jaguar\CanvasInterface,
        Jaguar\Action\AbstractAction,
        Jaguar\Action\EdgeDetection,
        Jaguar\Action\ColorSlice,
        Jaguar\Action\Color\Negate,
        Jaguar\Action\Color\Grayscale,
        Jaguar\Action\Color\Boost,
        Jaguar\Action\Color\Gamma,
        Jaguar\Action\Color\Sepia,
        Jaguar\Action\GraySketchy,
        Jaguar\Action\Mirror,
        Jaguar\Action\Sharpen,

        Jaguar\Action\Light,
        Jaguar\Action\Color\Antique,
        Jaguar\Action\Sketchy,
        Jaguar\Action\Posterize,
        Jaguar\Action\Screen,
        Jaguar\Action\Smooth,
        Jaguar\Action\Wavy,
        Jaguar\Action\Convolution,
        Jaguar\Action\Blur\SelectiveBlur,
        Jaguar\Util,
        Jaguar\Action\Preset\Monopin,
        Jaguar\Action\Preset\Dreamy,
        Jaguar\Action\Preset\Chrome,
        Jaguar\Action\Preset\Velvet,



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
if (!class_exists('ColorSlice_effect')) {
  class ColorSlice_effect extends AbstractAction
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
                                  ->apply(new ColorSlice());
          }

  }
}
if (!class_exists('light_effect')) {
  class light_effect extends AbstractAction
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
                                  ->apply(new Light());
          }

  }
}
if (!class_exists('Antique_effect')) {
  class Antique_effect extends AbstractAction
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
                                  ->apply(new Antique());
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
                                  ->apply(new Posterize(32));
          }

  }
}
if (!class_exists('paint_sharp')) {
  class paint_sharp extends AbstractAction
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
                                  // ->apply(new EdgeDetection(EdgeDetection::LAPLACIAN_FILTER3));

                                  ->apply(new Sharpen(Sharpen::SHARPEN_STRONG))
                                  ->apply(new Posterize(32));
          }

  }
}
if (!class_exists('paint_noise')) {
  class paint_noise extends AbstractAction
  {

          /**
           * Apply Pencil Action
           *
           * @param CanvasInterface $canvas
           */
          protected function doApply(CanvasInterface $canvas)
          {


                  $transformation = new Transformation($canvas);
                  $transformation->overlay(new Canvas(Util::getResourcePath('/Preset/noise.gd2')))
                                  ->apply(new SelectiveBlur())

                                  // ->apply(new Boost())
                                  // ->apply(new SelectiveBlur())
                                  ->apply(new Posterize(28));
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
if (!class_exists('mirror_effect')) {
  class mirror_effect extends AbstractAction
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
                                  ->apply(new Mirror());
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
if (!class_exists('Vintage_beam_effect')) {
  class Vintage_beam_effect extends AbstractAction
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
                                ->overlay(new Canvas(Util::getResourcePath('/Preset/beam.gd2')))
                                ->overlay(new Canvas(Util::getResourcePath('/Preset/vignette.gd2')));
          }

  }
}
if (!class_exists('canvas_effect')) {
  class canvas_effect extends AbstractAction
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
                                ->overlay(new Canvas(Util::getResourcePath('/Preset/canvas.gd2')));
          }

  }
}
if (!class_exists('chrome_effect')) {
  class chrome_effect extends AbstractAction
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
                                ->apply(new Chrome());
          }

  }
}
if (!class_exists('velvet_effect')) {
  class velvet_effect extends AbstractAction
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
                                ->apply(new Velvet());
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
