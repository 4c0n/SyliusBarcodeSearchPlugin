<img src="https://travis-ci.com/4c0n/SyliusBarcodeSearchPlugin.svg?branch=master" alt="build:started">

#### Setup development environment:
```bash
docker-compose build
docker-compose up -d
docker-compose exec php composer --working-dir=/srv/sylius install
docker-compose run --rm nodejs yarn --cwd=/srv/sylius/tests/Application install
docker-compose run --rm nodejs yarn --cwd=/srv/sylius/tests/Application build
docker-compose exec php bin/console assets:install public
docker-compose exec php bin/console doctrine:schema:create
docker-compose exec php bin/console sylius:fixtures:load -n
```
#### Running test
```bash
docker-compose exec php sh
bin/console doc:sch:create
cd ../..
vendor/bin/behat
```

#### Installation

1. Install using composer:
    ```bash
    composer require 4c0n/sylius-barcode-search
    ```
2. Override template:
    ```twig
    {# templates/bundles/SyliusShopBundle/Product/Index/_search.html.twig #}
    <div class="ui segment">
        <form method="get" action="{{ path('sylius_shop_product_index', {'slug': app.request.attributes.get('slug')}) }}" class="ui loadable form" id="nedac-sylius-barcode-search-plugin-search-form">
            <div class="ui stackable grid" id="searchbar">
                <div class="column" id="searchbarTextField">
                    {% for filter in products.definition.enabledFilters %}
                        {{ sylius_grid_render_filter(products, filter) }}
                    {% endfor %}
                </div>
                <div class="right aligned column" id="searchbarButtons">
                    <div class="ui buttons">
                        <button type="submit" class="ui primary icon labeled button"><i class="search icon"></i> {{ 'sylius.ui.search'|trans }}</button>
                        <a href="#" class="ui primary icon labeled button" id="nedac-sylius-barcode-search-plugin-start-button">
                            <i class="barcode icon"></i> EAN
                        </a>
                        <a href="{{ path('sylius_shop_product_index', {'slug': app.request.attributes.get('slug')}) }}" class="ui negative icon labeled button">
                            <i class="cancel icon"></i> {{ 'sylius.ui.clear'|trans }}
                        </a>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="ui modal" id="nedac-sylius-barcode-plugin-scan-modal">
        <i class="close icon" id="nedac-sylius-barcode-plugin-scan-modal-close-button"></i>
        <div class="header">
            Scan barcode
        </div>
        <div id="interactive" class="viewport"></div>
        <div class="actions">
            <div class="ui black deny button" id="nedac-sylius-barcode-plugin-scan-modal-stop-button">
                Stop
            </div>
        </div>
    </div>
    ```
3. Install assets:
    ```bash
   bin/console sylius:install:assets
    ```
Just three steps!
Now it's up to you to configure the product grid in such a way that a field containing the EAN is being filtered.
