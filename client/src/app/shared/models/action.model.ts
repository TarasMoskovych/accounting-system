export class Action {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public userId?: number,
    public id?: number,
    public categoryName?: string
  ) { }
}

export const actionTypes = [
  {
    type: 'income',
    label: 'Income'
  },
  {
    type: 'outcome',
    label: 'Outcome'
  }
];

export const actionTimePeriods = [
  {
    type: 'd',
    label: 'Day'
  },
  {
    type: 'w',
    label: 'Week'
  },
  {
    type: 'M',
    label: 'Month'
  }
];

export const searchMap = {
  categoryName: 'Category',
  date: 'Date',
  amount: 'Price',
  type: 'Type'
};
