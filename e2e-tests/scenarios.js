'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('spApp', function() {


  it('should automatically redirect to /cz/sluzby when location hash is /cz', function() {
    browser.get('index.html#!/cz');
    expect(browser.getLocationAbsUrl()).toMatch("/cz/sluzby");
  });


  describe('index component', function() {

    beforeEach(function() {
      browser.get('index.html');
    });


    it('should render sluzby when user navigates to /sluzby', function() {
      expect(element.all(by.css('.article h2')).first().getText()).
        toMatch(/Tlumočení/);
    });

  });
});
