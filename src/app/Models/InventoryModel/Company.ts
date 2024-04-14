export class Company 
{
    id: any;
    company_id: any;
    company_code:any;
    comp_prefix:any;
    company_name:any;
    comp_mailing_name:any;
    company_address:any;
    company_type:any;
    parent_company:any;
    country_name:any;
    state_name:any;
    city_name:any;
    pin_code:any;
    office_contactno:any;
    work_phoneno:any;
    mobile_no:any;
    email_id:any;
    website_name:any;
    fin_period_from:any;
    fin_period_to:any;
    work_address:any;
    use_audit_feature:any;
    decimal_place:any;
    incometax_required:any;
    // salestax_required:any;
    // servicetax_required:any;
    // roc_required:any;
    tds_required:any;
    maintain_licencedetails:any;
    maintain_businessunit:any;
    pan_no:any;
    pan_circle_no:any;
    pan_wardno:any;
    pan_accessing_officer:any;
    inhouse_responsibleperson:any;
    outside_responsibleperson:any;
    remarks_otherinfo:any;
    circleno:any;
    taxpayment_type:any;
    taxpayment_date:any;
    returnfilling_type:any;
    returnfilling_date:any;
    gstin_no:any;
    tin_no:any;
    cst_no:any;
    sales_inhouse_responsibleperson:any;
    sales_outside_responsibleperson:any;
    sales_remarks_otherinfo:any;
    sales_circleno:any;
    sales_taxpayment_type:any;
    sales_taxpayment_date:any;
    sales_returnfilling_type:any;
    sales_returnfilling_date:any;
    servicetax_no:any;
    service_nature:any;
    service_inhouse_responsibleperson:any;
    service_outside_responsibleperson:any;
    service_remarks_otherinfo:any;
    service_circleno:any;
    service_taxpayment_type:any;
    service_taxpayment_date:any;
    service_returnfilling_type:any;
    service_returnfilling_date:any;
    roc_inhouse_responsibleperson:any;
    roc_outside_responsibleperson:any;
    roc_remarks_otherinfo:any;
    roc_circleno:any;
    roc_taxpayment_type:any;
    roc_taxpayment_date:any;
    roc_returnfilling_type:any;
    roc_returnfilling_date:any;
    otherdetails_remarks:any;
    fin_year: any;
    username:any;

    company_licence_details:company_licence_details[];   
}

export class company_licence_details
{ 
    sln_no:any;
    licence_no:any;
    licence_name:any;
    expiry_date:any;
    remarks:any;
}