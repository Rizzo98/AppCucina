import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientsModalPage } from './ingredients-modal.page';

describe('IngredientsModalPage', () => {
  let component: IngredientsModalPage;
  let fixture: ComponentFixture<IngredientsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
