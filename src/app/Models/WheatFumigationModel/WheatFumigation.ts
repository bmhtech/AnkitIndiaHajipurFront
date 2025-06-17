export type WheatFumigation = {
  id?: number;
  fumigation_id?: string;
  fumigation_no: string;
  fumigation_date: string;
  business_unit: string;

  company_id?: any;
  fin_year?: any;
  username?: any;

  wheat_fumigation_details?: WheatFumigationDetails[];
};

export type WheatFumigationDetails = {
  fumigation_id?: string;
  slno: number;
  wf_date: string;
  wf_time: string;
  //abd_trader: string;
  warehouse: string;
  stack: string;
  variety: string;
  bags: number;
  qty_mt: number;
  fumigation_by: string;
  reactant: string;
  volume: number;
  dose: number;
  total_dose: number;
  degassing_date: string;
  degassing_time: string;
  manpower: number;
  expected_stack_opening_date: string;
  pcmw_sign: string;
  supervisor_sign: string;
  lab_sign: string;
  remarks: string;
  wheat_fumi_qc: string;
};

export type FumigationStkOpnDate = WheatFumigation &
  WheatFumigationDetails & {
    warehouse_name: string
    stack_open_date: string | null;
    stack_use: "Yes" | "No";
  };
