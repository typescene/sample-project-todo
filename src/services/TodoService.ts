import {
  CHANGE,
  managedChild,
  ManagedList,
  ManagedRecord,
  ManagedService,
  observe,
} from "typescene";

/** Represents a single to-do item */
export class TodoItem extends ManagedRecord {
  constructor(public text: string) {
    super();
  }
  complete?: boolean;
}

export default class TodoService extends ManagedService {
  name = "App.Todo";

  /** Current list of todo items */
  @managedChild
  readonly items = new ManagedList().restrict(TodoItem).propagateEvents();

  nRemaining = 0;
  nCompleted = 0;

  addItem(text: string) {
    if (text) this.items.add(new TodoItem(text));
  }

  removeCompleted() {
    this.items.forEach(it => {
      if (it.complete) this.items.remove(it);
    });
  }

  @observe
  static TodoServiceObserver = class {
    constructor(public readonly svc: TodoService) {}
    onItemsChangeAsync() {
      let nCompleted = this.svc.items.pluck("complete").filter(b => b).length;
      let total = this.svc.items.count;
      this.svc.nCompleted = nCompleted;
      this.svc.nRemaining = total - nCompleted;
      this.svc.emit(CHANGE);
    }
  };
}
