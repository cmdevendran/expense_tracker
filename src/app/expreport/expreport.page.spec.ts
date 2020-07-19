import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpreportPage } from './expreport.page';

describe('ExpreportPage', () => {
  let component: ExpreportPage;
  let fixture: ComponentFixture<ExpreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
