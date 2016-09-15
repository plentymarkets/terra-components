import { TerraComponentsPage } from './app.po';

describe('terra-components App', function() {
  let page: TerraComponentsPage;

  beforeEach(() => {
    page = new TerraComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
