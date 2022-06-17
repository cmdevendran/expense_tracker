import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StocksTickersPage } from './stocks-tickers.page';

describe('StocksTickersPage', () => {
  let component: StocksTickersPage;
  let fixture: ComponentFixture<StocksTickersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksTickersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StocksTickersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
