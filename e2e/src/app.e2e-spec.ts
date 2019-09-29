import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.ignoreSynchronization = true;
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Todo list');
  });
});
