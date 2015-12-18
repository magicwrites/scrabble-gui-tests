describe('when logged into application', function () {
    it('should be possible to logout using top-right menu', function (done) {
        browser
            .waitForVisible('.sc-layout-topbar-right md-menu')
            .click('.sc-layout-topbar-right md-menu')
            .waitForVisible('md-menu-content [ng-click="logOut()"]')
            .click('md-menu-content [ng-click="logOut()"]')
            .waitForVisible('form[name="loginForm"]')
            .call(done);
    });
});