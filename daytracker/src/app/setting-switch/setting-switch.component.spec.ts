import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingSwitchComponent } from "./setting-switch.component";

describe("SettingSwitchComponent", () => {
  let component: SettingSwitchComponent;
  let fixture: ComponentFixture<SettingSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
