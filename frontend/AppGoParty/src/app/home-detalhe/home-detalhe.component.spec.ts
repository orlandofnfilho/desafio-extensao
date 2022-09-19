import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetalheComponent } from './home-detalhe.component';

describe('HomeDetalheComponent', () => {
  let component: HomeDetalheComponent;
  let fixture: ComponentFixture<HomeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
