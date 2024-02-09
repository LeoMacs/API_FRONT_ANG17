import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalListComponent } from './canal-list.component';

describe('CanalListComponent', () => {
  let component: CanalListComponent;
  let fixture: ComponentFixture<CanalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
