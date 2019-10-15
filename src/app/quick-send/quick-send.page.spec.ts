import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSendPage } from './quick-send.page';

describe('QuickSendPage', () => {
  let component: QuickSendPage;
  let fixture: ComponentFixture<QuickSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
