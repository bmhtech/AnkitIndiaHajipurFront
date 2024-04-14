import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchageEnqDocList, PurchageEnqDocsLists } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseEnquiry' ;

@Component({
  selector: 'app-transmodal',
  templateUrl: './transmodal.component.html',
  styleUrls: ['./transmodal.component.scss']})

export class TransmodalComponent implements OnInit
{
  public userForm1: FormGroup;
  purEnquiryList:PurchageEnqDocList[];
  purEnquiryDocsLists:{};
  indent_number = '';
 
  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService)
  {
    this.userForm1=fb.group({ 
     purEnquiryList: this.fb.array([this.fb.group
    ({
        indent_no: '',
	      indent_date: '',
	      inserted_by: '' })]),

      purEnquiryDocsLists: this.fb.array([this.fb.group({
        indent_no: '',
        item_code: '',
        item_name: '',
        uom1: '',
        quantity: '',
        priority: ''})])
    });
  }

  get PurchageEnqDocsLists() { return this.userForm1.get('PurchageEnqDocsLists') as FormArray;}

  check2(event, index)
  {
    if(event.checked)
    {}
  }

  copyData(){}

  ngOnInit(){}

}
