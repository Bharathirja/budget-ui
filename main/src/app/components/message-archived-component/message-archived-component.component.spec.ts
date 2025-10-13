import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageArchivedComponentComponent } from './message-archived-component.component';

describe('MessageArchivedComponentComponent', () => {
  let component: MessageArchivedComponentComponent;
  let fixture: ComponentFixture<MessageArchivedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageArchivedComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageArchivedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
