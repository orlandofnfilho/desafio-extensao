import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoNovoComponent } from './genero-novo.component';

describe('EventoNovoComponent', () => {
  let component: EventoNovoComponent;
  let fixture: ComponentFixture<EventoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
