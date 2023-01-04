import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionariosComponent } from './cuestionarios.component';

describe('CuestionariosComponent', () => {
  let component: CuestionariosComponent;
  let fixture: ComponentFixture<CuestionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
