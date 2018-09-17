<?php

/*
 * This file is part of the Jaguar package.
 * (c) Hyyan Abo Fakher <tiribthea4hyyan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Jaguar\Action\Color;

use Jaguar\CanvasInterface;
use Jaguar\Action\AbstractAction;

class Contrast extends AbstractAction
{
    private $level;

    /**
     * construct new contrast action
     *
     * @param integer $level
     *
     * @throws \InvalidArgumentException if invalid level
     */
    public function __construct($level = 0)
    {
        $this->setLevel($level);
    }

    /**
     * Set contrast level
     *
     * @param integer $level
     *
     * @return \Jaguar\Action\Color\Contrast
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get Contrast Level
     * @return int
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * {@inheritdoc}
     */
    protected function doApply(CanvasInterface $canvas)
    {
        imagefilter($canvas->getHandler(), IMG_FILTER_CONTRAST, -$this->getLevel());
    }

}
