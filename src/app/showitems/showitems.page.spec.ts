import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowitemsPage } from './showitems.page';

describe('ShowitemsPage', () => {
  let component: ShowitemsPage;
  let fixture: ComponentFixture<ShowitemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowitemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowitemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
