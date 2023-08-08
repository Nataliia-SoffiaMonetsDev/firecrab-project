import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsForm } from '../../interfaces/forms.interfaces';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { FormControlComponent } from '../../inputs/form-control/form-control.component';
import { TextareaInputComponent } from '../../inputs/textarea-input/textarea-input.component';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { PhoneNumberInputComponent } from '../../inputs/phone-number-input/phone-number-input.component';
import { ContactUsData } from '../../interfaces/data.interfaces';

@Component({
    standalone: true,
    selector: 'app-contact-us-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextInputComponent,
        FormControlComponent,
        TextareaInputComponent,
        DateInputComponent,
        PhoneNumberInputComponent
    ]
})
export class ContactUsFormComponent {
    private readonly formBuilder: FormBuilder = inject(FormBuilder);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    public readonly form: FormGroup<ContactUsForm> = this.getContactUsForm();
    public submitted: boolean = false;

    @Output() submitForm: EventEmitter<ContactUsData> = new EventEmitter();

    public onSubmit(): void {
        if (this.form.invalid) {
            this.submitted = true;
            return;
        };

        this.submitForm.emit(this.form.getRawValue());
        this.submitted = false;
        this.cdr.detectChanges();
    }

    private getContactUsForm(): FormGroup<ContactUsForm> {
        return this.formBuilder.group<ContactUsForm>({
            name: this.formBuilder.control('', [Validators.required]),
            companyName: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            address: this.formBuilder.control('', [Validators.required]),
            country: this.formBuilder.control('', [Validators.required]),
            phoneNumber: this.formBuilder.control('', [Validators.required]),
            additionalInfo: this.formBuilder.control(''),
            dateOfConsultation: this.formBuilder.control(''),
        });
    }
}
