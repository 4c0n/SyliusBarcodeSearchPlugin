Feature: Scanning an EAN barcode and using its value to search for a product
  As a shop user
  I need to be able to use the camera on my device to search for EAN codes
  In order to simplify the ordering process

  Background:
    Given the store operates on a single channel in "United States"
    And the store classifies its products as "Fluffy Pets"
    And the store has a product "Berserk Pug" with code "B_PUG", created at "05-10-2016"
    And this product belongs to "Fluffy Pets"
    And this product's price is "$12.50"
    And the store also has a product "Pug of Love" with code "L_PUG", created at "06-10-2016"
    And this product belongs to "Fluffy Pets"
    And this product's price is "$15.50"
    And the store also has a product "8710198150303" with code "X_PUG", created at "07-09-2016"
    And this product belongs to "Fluffy Pets"
    And this product's price is "$12.51"

  @barcode @ui @javascript
  Scenario:
    When I browse products from taxon "Fluffy Pets"
    And I scan a barcode using the camera on my device
    Then I should see the product "8710198150303"
    And I should not see the product "Berserk Pug"
    And I should not see the product "Pug of Love"
