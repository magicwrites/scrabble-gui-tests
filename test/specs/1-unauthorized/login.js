describe('when user is not authorized', function () {
    it('should be possible to login properly', function (done) {
        browser
            .url('http://localhost:81')
            .setViewportSize({ width: 1280, height: 720 })
            .waitForExist('[name="loginForm"] [ng-model="user.userName"]')
            .setValue('[name="loginForm"] [ng-model="user.userName"]', 'admincompany1@future-processing.com')
            .waitForExist('[name="loginForm"] [ng-model="user.password"]')
            .setValue('[name="loginForm"] [ng-model="user.password"]', 'P@ssw0rd')
            .waitForEnabled('[name="loginForm"] [type="submit"]')
            .click('[name="loginForm"] [type="submit"]')
            .waitForVisible('.sc-layout-sidebar')
            .call(done);
    });
});