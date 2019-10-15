import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendPage } from './list-send.page';

describe('ListSendPage', () => {
  let component: ListSendPage;
  let fixture: ComponentFixture<ListSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
