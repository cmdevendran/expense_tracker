import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagestockPage } from './managestock.page';

describe('ManagestockPage', () => {
  let component: ManagestockPage;
  let fixture: ComponentFixture<ManagestockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagestockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagestockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
