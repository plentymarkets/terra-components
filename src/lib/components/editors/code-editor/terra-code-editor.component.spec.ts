import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslationService } from 'angular-l10n';
import { MockElementRef } from '../../../testing/mock-element-ref';
import { MockTranslationService } from '../../../testing/mock-translation-service';
import { TerraCodeEditorComponent } from './terra-code-editor.component';

describe(`TerraCodeEditorComponent:`, () => {
  let component: TerraCodeEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslationService,
          useClass: MockTranslationService
        },
        {
          provide: ElementRef,
          useClass: MockElementRef
        }
      ]
    });
  });

  beforeEach(() => {
    component = new TerraCodeEditorComponent(
      TestBed.get(TranslationService),
      TestBed.get(ElementRef)
    );
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should initialize its inputs`, () => {
    expect(component.switchFromCode).toBe(true);
  });
});
