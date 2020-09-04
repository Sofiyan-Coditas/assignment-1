import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger, animateChild, query } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
  animations: [
    trigger('host', [
      transition(':leave', [
        query('@container,@content', [
          animateChild()
        ])
      ]),
      transition(':enter', [
        query('@container,@content', [
          animateChild()
        ])
      ]),
    ]),
    trigger('content', [
      transition(':leave', [
        style({
          transform: 'scale(1)'
        }),
        animate('100ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('300ms ease-in', style({
          transform: 'scale(0)'
        }))
      ]),
      transition(':enter', [
        style({
          transform: 'scale(0.5)'
        }),
        animate('200ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('100ms ease-out', style({
          transform: 'scale(1)'
        }))
      ]),
    ]),
    trigger('container', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('230ms ease-in', style({
          opacity: 0,
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('230ms ease-in', style({
          opacity: 1,
        }))
      ]),
    ])
  ]
})
export class AddVehicleComponent implements OnInit {

  @Input() dialogData;
  @Input() user;
  errorMessage = '';
  editFlag = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) { }

  @ViewChild('myModal', {static: false}) modal: ElementRef;
  @Output('vehicleData') vehicleData: EventEmitter<any> = new EventEmitter();

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]],
      color: ['', [Validators.required]],
      chasisNumber: [''],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    if (this.dialogData && this.dialogData.edit) {
      this.editFlag = true;
      this.setFormValues();
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Please Enter all the details!!';
      return;
    }

    const vehicleData = {
      name: this.form.controls.name.value,
      model: this.form.controls.model.value,
      color: this.form.controls.color.value,
      chasisNumber: this.form.controls.chasisNumber.value,
      price: this.form.controls.price.value,
      imageUrl: this.form.controls.imageUrl.value,
      userId: this.user.id
    }

    this.vehicleService.addVehicle(vehicleData).subscribe((result: any) => {
      this.vehicleData.emit(result);
      this.close();
    })
  }

  setFormValues() {
    this.form.patchValue(this.dialogData);
  }

  update() {
    if (this.form.invalid) {
      this.errorMessage = 'Please Enter all the details!!';
      return;
    }

    const vehicleData = {
      name: this.form.controls.name.value,
      model: this.form.controls.model.value,
      color: this.form.controls.color.value,
      chasisNumber: this.form.controls.chasisNumber.value,
      price: this.form.controls.price.value,
      imageUrl: this.form.controls.imageUrl.value,
      userId: this.user.id,
      id: this.dialogData.id
    }

    this.vehicleService.updateVehicle(vehicleData).subscribe((result: any) => {
      this.vehicleData.emit(result);
      this.close();
    })
  }

}
