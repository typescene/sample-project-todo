import { BrowserApplication } from "@typescene/webapp";
import MainActivity from "./activities/main/activity";
import TodoService from "./services/TodoService";

new TodoService().register();

const app = BrowserApplication.run(
  MainActivity
  // ... add activities here
);
