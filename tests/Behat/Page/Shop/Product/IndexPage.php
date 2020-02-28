<?php

declare(strict_types=1);

namespace Tests\Nedac\SyliusBarcodeSearchPlugin\Behat\Page\Shop\Product;

use FriendsOfBehat\PageObjectExtension\Page\SymfonyPage;

final class IndexPage extends SymfonyPage implements IndexPageInterface
{
    public function scanBarcode(): void
    {
        $this->getDocument()->clickLink('nedac-sylius-barcode-search-plugin-start-button');
    }

    public function getRouteName(): string
    {
        return 'sylius_shop_product_index';
    }
}
