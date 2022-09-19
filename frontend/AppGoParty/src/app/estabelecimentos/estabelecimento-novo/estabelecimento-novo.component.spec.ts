import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoNovoComponent } from './estabelecimento-novo.component';

describe('EstabelecimentoNovoComponent', () => {
  let component: EstabelecimentoNovoComponent;
  let fixture: ComponentFixture<EstabelecimentoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
