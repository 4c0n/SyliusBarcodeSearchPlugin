<?php

declare(strict_types=1);

namespace Tests\Nedac\SyliusBarcodeSearchPlugin\Behat\Context\Ui\Shop;

use Behat\Behat\Context\Context;
use Tests\Nedac\SyliusBarcodeSearchPlugin\Behat\Page\Shop\Product\IndexPageInterface;

final class ProductContext implements Context
{
    private IndexPageInterface $indexPage;

    public function __construct(IndexPageInterface $indexPage)
    {
        $this->indexPage = $indexPage;
    }

    /**
     * @When I scan a barcode using the camera on my device
     */
    public function iScanABarcodeUsingTheCameraOnMyDevice(): void
    {
        $this->indexPage->scanBarcode();
        sleep(2);
    }
}
