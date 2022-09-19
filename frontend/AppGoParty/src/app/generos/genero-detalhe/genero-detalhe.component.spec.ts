import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroDetalheComponent } from './genero-detalhe.component';

describe('GeneroDetalheComponent', () => {
  let component: GeneroDetalheComponent;
  let fixture: ComponentFixture<GeneroDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
