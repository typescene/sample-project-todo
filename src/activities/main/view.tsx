import { HMR } from "@typescene/webapp";
import JSX, { bind, bindf, UIStyle } from "typescene/JSX";

export default HMR.enableViewReload(
  module,
  <scrollcontainer>
    <flowcell
      dimensions={{ width: 640, maxWidth: "100vw" }}
      position={{ gravity: "center" }}
      padding={{ top: 32, x: 16 }}
      revealTransition="fade"
    >
      {/* --- page heading: */}
      <row>
        <label icon="check" iconSize={40} iconColor="@green" />
        <h1>Todo</h1>
      </row>
      <spacer dimensions={{ height: 32 }} />

      {/* --- new task input form: */}
      <form
        padding={{ x: 16, y: 8 }}
        borderColor="@separator"
        borderThickness={1}
        formContext={bind("formInput")}
      >
        <row>
          <borderlesstextfield
            name="newTask"
            placeholder="Enter a task..."
            onEnterKeyPress="addTask()"
            requestFocus
          />
          <borderlessbutton label="Add" onClick="addTask()" />
        </row>
      </form>
      <spacer dimensions={{ height: 16 }} />

      {/* --- Items list: */}
      <list items={bind("todoService.items")}>
        {/* --- List item template: */}
        <listcell padding={{ x: 16, y: 8 }} onToggleTask="toggleTask()">
          <row revealTransition="down-fast">
            <toggle state={bind("object.complete")} onChange="+ToggleTask" />
            <style
              state={bind("object.complete")}
              styles={{
                true: UIStyle.create({
                  textStyle: { strikeThrough: true },
                }),
              }}
            >
              <expandedlabel onClick="+ToggleTask">{bind("object.text")}</expandedlabel>
            </style>
          </row>
        </listcell>

        {/* --- List container: */}
        <flowcell separator={{ type: "line" }} animatedContentRenderingDuration={200} />
      </list>

      {/* --- Footer, if non-empty: */}
      <flowcell hidden={bind("!todoService.items.count")}>
        <separator />
        <spacer />
        <centerrow>
          <label textStyle={{ color: "@text/50%" }}>
            {bindf("${todoService.nRemaining} task#{/s} remaining")}
          </label>
          <linkbutton hidden={bind("!todoService.nCompleted")} onClick="removeCompleted()">
            Remove completed
          </linkbutton>
        </centerrow>
      </flowcell>
    </flowcell>
  </scrollcontainer>
);
