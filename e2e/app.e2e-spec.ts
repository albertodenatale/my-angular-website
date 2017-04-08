import { AngularCvPage } from './app.po';

describe('angular-cv App', () => {
  let page: AngularCvPage;

  beforeEach(() => {
    page = new AngularCvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
