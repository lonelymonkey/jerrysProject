<?php

/*
 * This file is part of the Jaguar package.
 * (c) Hyyan Abo Fakher <tiribthea4hyyan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Jaguar\Tests\Action;

use Jaguar\Action\ColorSlice;

class ColorSliceTest extends AbstractActionTest
{

    public function getAction()
    {
        return new ColorSlice();
    }

    public function testApply()
    {
        $this->assertInstanceOf(
                '\Jaguar\Action\ColorSlice'
                , $this->getAction()->apply($this->getCanvas())
        );
    }

}
