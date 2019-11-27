import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Homepage2Page } from './homepage2.page';

describe('Homepage2Page', () => {
  let component: Homepage2Page;
  let fixture: ComponentFixture<Homepage2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homepage2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Homepage2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
