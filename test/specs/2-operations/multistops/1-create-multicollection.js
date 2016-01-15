describe('when on the booking dashboard', function () {
    it('should be possible to start a booking for a customer', function (done) {
        browser
            .url('http://' + process.argv[3].split('=')[1])
            .waitForVisible('[name="startTypingAccountNameOrNumber"]')
            .setValue('[name="startTypingAccountNameOrNumber"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .click('.sc-typeahead__suggestions li:first-child')
            .waitForEnabled('[ng-click="next()"]')
            .click('[ng-click="next()"]')
            .waitForVisible('.sc-booking-dashboard__tiles-section-content')
            .call(done);
    });

    it('should be possible to fill the customer data', function (done) {
        browser
            .waitForVisible('[name="bookingContactForm"] input[name="name"]')
            .setValue('[name="bookingContactForm"] input[name="name"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .click('.sc-typeahead__suggestions li:first-child')
            .waitForValue('[name="bookingContactForm"] input[name="email"]')
            .call(done);
    });

    it('should NOT be possible to remove the only delivery', function (done) {
        browser
            .waitForVisible('#booking-stop-point-tile-1 [sc-header="Delivery"]')
            .waitForEnabled('#booking-stop-point-tile-1 [ng-click="removeStopPoint(scIndex)"]', 500, true)
            .call(done);
    });

    it('should NOT be possible to remove the only collection', function (done) {
        browser
            .waitForVisible('#booking-stop-point-tile-0 [sc-header="Collection"]')
            .waitForEnabled('#booking-stop-point-tile-0 [ng-click="removeStopPoint(scIndex)"]', 500, true)
            .call(done);
    });

    it('should be possible to create many collections', function (done) {
        browser
            .waitForVisible('#booking-stop-point-tile-0 [ng-click="addNewStopPoint(scIndex)"]')
            .click('#booking-stop-point-tile-0 [ng-click="addNewStopPoint(scIndex)"]')
            .waitForVisible('#booking-stop-point-tile-1 [sc-header="Collection"]')
            .click('#booking-stop-point-tile-1 [ng-click="addNewStopPoint(scIndex)"]')
            .waitForVisible('#booking-stop-point-tile-2 [sc-header="Collection"]')
            .call(done);
    });

    it('should NOT be possible to remove the only delivery', function (done) {
        browser
            .waitForVisible('#booking-stop-point-tile-3 [sc-header="Delivery"]')
            .waitForEnabled('#booking-stop-point-tile-3 [ng-click="removeStopPoint(scIndex)"]', 500, true)
            .call(done);
    });

    it('should be possible to review price after providing all of the addresses', function (done) {
        browser
            .waitForVisible('#booking-stop-point-tile-0 [name="addresses"]')
            .setValue('#booking-stop-point-tile-0 [name="addresses"]', 'wrocla')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .click('.sc-typeahead__suggestions li:first-child')
            .setValue('#booking-stop-point-tile-0 [name="name"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .click('.sc-typeahead__suggestions li:first-child')

            .waitForVisible('#booking-stop-point-tile-1 [name="addresses"]')
            .setValue('#booking-stop-point-tile-1 [name="addresses"]', 'gliwic')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-1 [name="addresses"]', 32, 32)
            .leftClick()
            .setValue('#booking-stop-point-tile-1 [name="name"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-1 [name="name"]', 32, 32)
            .leftClick()

            .waitForVisible('#booking-stop-point-tile-2 [name="addresses"]')
            .setValue('#booking-stop-point-tile-2 [name="addresses"]', 'katowic')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-2 [name="addresses"]', 32, 32)
            .leftClick()
            .setValue('#booking-stop-point-tile-2 [name="name"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-2 [name="name"]', 32, -64)
            .leftClick()

            .waitForVisible('#booking-stop-point-tile-3 [name="addresses"]')
            .setValue('#booking-stop-point-tile-3 [name="addresses"]', 'olkus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-3 [name="addresses"]', 32, 32)
            .leftClick()
            .setValue('#booking-stop-point-tile-3 [name="name"]', 'cus')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .click('.sc-typeahead__suggestions li:first-child')

            .waitForVisible('.sc-booking-dashboard__pricing-label-details-price')
            .call(done);
    });

    it('should be visible that the price has changed if any of the addresses are modified', function (done) {
        var originalPrice;

        browser
            .waitForVisible('.sc-booking-dashboard__pricing-label-details-price')
            .getText('[ng-model="price.customerPriceDetails.totalCost"]').then(function (price) {
                originalPrice = price;
            })
            .click('#booking-stop-point-tile-1')
            .waitForVisible('#booking-stop-point-tile-1 [name="addresses"]')
            .setValue('#booking-stop-point-tile-1 [name="addresses"]', 'warsaw')
            .waitForVisible('.sc-typeahead__suggestions li:first-child')
            .moveToObject('#booking-stop-point-tile-1 [name="addresses"]', 32, 32)
            .leftClick()
            .waitForVisible('.sc-booking-dashboard__pricing-label-details-price')
            .getText('[ng-model="price.customerPriceDetails.totalCost"]').then(function (price) {
                expect(originalPrice).not.toBe(price);
            })
            .call(done);
    });
});