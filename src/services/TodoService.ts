import {
  CHANGE,
  managedChild,
  ManagedList,
  ManagedRecord,
  ManagedService,
  observe,
} from "typescene";

/** Represents a single to-do item record */
export class TodoItem extends ManagedRecord {
  /**
   * Create a new todo item
   * @param text
   *  Text for this todo item
   */
  constructor(public text: string) {
    super();
  }

  /** True if this item is marked complete */
  complete?: boolean;
}

export default class TodoService extends ManagedService {
  name = "App.Todo";

  /** Current list of todo items */
  @managedChild
  readonly items = new ManagedList().restrict(TodoItem).propagateEvents();

  /** Number of remaining items */
  nRemaining = 0;

  /** Number of completed items */
  nCompleted = 0;

  /** Add a todo item with given text */
  addItem(text: string) {
    if (text) this.items.add(new TodoItem(text));
  }

  /** Remove all completed todo items */
  removeCompleted() {
    this.items.forEach((it) => {
      if (it.complete) this.items.remove(it);
    });
  }

  @observe
  static TodoServiceObserver = class {
    constructor(public readonly svc: TodoService) {}

    // this method is called when `items` is set, or emits a change event
    onItemsChangeAsync() {
      let nCompleted = this.svc.items.pluck("complete").filter((b) => b).length;
      let total = this.svc.items.count;
      this.svc.nCompleted = nCompleted;
      this.svc.nRemaining = total - nCompleted;
      this.svc.emitChange();
    }
  };
}
