<?php

declare(strict_types=1);

namespace Tests\Nedac\SyliusBarcodeSearchPlugin\Behat\Page\Shop\Product;

interface IndexPageInterface
{
    public function scanBarcode(): void;
}
