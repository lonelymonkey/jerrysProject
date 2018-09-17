<?php

/*
 * This file is part of the Jaguar package.
 * (c) Hyyan Abo Fakher <tiribthea4hyyan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Jaguar\Tests\Action\Color;

use Jaguar\Tests\Action\AbstractActionTest;
use Jaguar\Action\Color\Contrast;

class ContrastTest extends AbstractActionTest
{

    public function getAction()
    {
        return new Contrast();
    }

    public function testApply()
    {
        $this->assertInstanceOf(
                '\Jaguar\Action\Color\Contrast'
                , $this->getAction()->apply($this->getCanvas())
        );
    }

}
