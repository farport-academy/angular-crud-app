import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { EssentialComponent } from '../../core/essentialComponent';


export interface FormConfig {
  name: string,
  label: string,
  type: string,
  validators: ValidatorFn | ValidatorFn[],
  errorMessage?: string
}

@Component({
  selector: 'app-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent<T> extends EssentialComponent implements OnInit, AfterViewInit {

  @Input() formConfig!: FormConfig[] 
  @Input() startingValues!: T | null
  @Output() onSubmit: EventEmitter<any> = new EventEmitter()
  @Output() onChanges: EventEmitter<FormGroup<any>> = new EventEmitter()
  form!:FormGroup

  private generateForm(formConfig: FormConfig[]){
    const configOutput : Record<any,FormControl> = {}
    formConfig.forEach( (item) =>{
      configOutput[item.name] =  new FormControl('', item.validators)
    })
    return configOutput
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe( (value) => {
      this.onChanges.emit(this.form)
    })
    console.log(this.startingValues)
    if( this.startingValues){
      this.form?.patchValue(this.startingValues )
    }
  }

  ngOnInit(): void {
      this.form = new FormGroup(this.generateForm(this.formConfig))
  }

  submit(){
    this.onSubmit.emit(this.form.value)
    //this.form.reset()
  }

  
}


