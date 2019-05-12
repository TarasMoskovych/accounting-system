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
