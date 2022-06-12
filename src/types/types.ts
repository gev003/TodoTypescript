export interface ITodoItem {
  id: string;
  name: string;
  description: string;
}
export interface IEachTodoContainer {
  title: string;
  items: Array<ITodoItem>;
}

export type ITodoList = {
  [key: string]: IEachTodoContainer;
};

export type IEditableData = {
  origin: any;
  element: ITodoItem;
};

export type IAddTodoItem = Pick<ITodoItem, "name" | "description">;
