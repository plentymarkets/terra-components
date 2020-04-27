import { TerraInfoBoxComponent } from './terra-info-box.component';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

describe('TerraInfoBoxComponent:', () => {
  let component: TerraInfoBoxComponent = new TerraInfoBoxComponent();
  let tagList: Array<TerraTagInterface> = [];

  tagList.push(
    {
      name: 'test1'
    },
    {
      name: 'test2'
    }
  );

  afterEach(() => {
    component.inputTagList = [];
  });

  afterEach(() => {
    component.inputId = null;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it(`should getter #hasFooter return true if #inputTagList has entries`, () => {
    component.inputTagList = tagList;
    expect(component.hasFooter).toBe(true);
  });

  it(`should getter #hasFooter return true if #inputId has a value`, () => {
    component.inputId = 5;
    expect(component.hasFooter).toBe(true);
    expect(component.inputId).toEqual(jasmine.any(Number));
    expect(component.inputId).toBeGreaterThan(0);
  });

  it(`should getter #hasFooter return false if #inputTagList or #inputId are null`, () => {
    component.inputTagList = null;
    component.inputId = null;
    expect(component.hasFooter).toBe(false);
  });

  it(`should getter #hasFooter return false if #inputTagList is empty`, () => {
    component.inputTagList = [];
    expect(component.hasFooter).toBe(false);
  });
});
