import { HMR } from "@typescene/webapp";
import { bind, tl, UIBorderlessButton, UIBorderlessTextField, UICenterRow, UIExpandedLabel, UIFlowCell, UIFormContextController, UIHeading1, UILabel, UILinkButton, UIListCellAdapter, UIListController, UIRow, UIScrollContainer, UISeparator, UISpacer, UIStyle, UIStyleController, UIToggle } from "typescene";

export default HMR.enableViewReload(
  module,
  UIScrollContainer.with(
    UIFlowCell.with(
      {
        dimensions: { width: 640, maxWidth: "100vw" },
        position: { gravity: "center" },
        padding: { top: 32, x: 16 },
        revealTransition: "fade"
      },

      // --------------------------------------
      // page heading:
      UIRow.with(
        UILabel.withIcon("check", 40, "@green"),
        UIHeading1.withText("Todo"),
      ),
      UISpacer.withHeight(32),

      // --------------------------------------
      // new task input form:
      UIFlowCell.with(
        {
          padding: { x: 16, y: 8 },
          borderColor: "@separator",
          borderThickness: 1
        },
        UIFormContextController.with(
          { formContext: bind("formInput") },
          UIRow.with(
            UIBorderlessTextField.with({
              name: "newTask",
              placeholder: "Enter a task...",
              requestFocus: true,
              onEnterKeyPress: "addTask()"
            }),
            UIBorderlessButton.withLabel(
              "Add", "addTask()")
          )
        )
      ),
      UISpacer.withHeight(16),

      // --------------------------------------
      // items list:
      UIListController.with(
        {
          items: bind("todo.items"),
          onToggleTask: "toggleTask()"
        },

        // list item template:
        UIListCellAdapter.with(
          { padding: { x: 16, y: 8 } },
          UIRow.with(
            { revealTransition: "down-fast" },
            UIToggle.with({
              state: bind("object.complete"),
              onChange: "+ToggleTask"
            }),
            UIStyleController.with(
              {
                state: bind("object.complete"),
                styles: {
                  true: UIStyle.create({
                    textStyle: { strikeThrough: true }
                  })
                }
              },
              UIExpandedLabel.with({
                text: bind("object.text"),
                onClick: "+ToggleTask"
              })
            )
          )
        ),

        // list container:
        UIFlowCell.with({
          separator: { type: "line" },
          animatedContentRenderingDuration: 200
        })
      ),

      // --------------------------------------
      // footer, if non-empty
      UIFlowCell.with(
        { hidden: bind("!todo.items.count") },
        UISeparator,
        UISpacer,
        UICenterRow.with(
          tl("{@text/50%}${todo.nRemaining} task#{/s} remaining"),
          UILinkButton.with({
            hidden: bind("!todo.nCompleted"),
            label: "Remove completed",
            onClick: "removeCompleted()"
          })
        )
      )
    )
  )
)
