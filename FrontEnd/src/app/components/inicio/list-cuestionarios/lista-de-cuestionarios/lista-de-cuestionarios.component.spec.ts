import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeCuestionariosComponent } from './lista-de-cuestionarios.component';

describe('ListaDeCuestionariosComponent', () => {
  let component: ListaDeCuestionariosComponent;
  let fixture: ComponentFixture<ListaDeCuestionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeCuestionariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeCuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
