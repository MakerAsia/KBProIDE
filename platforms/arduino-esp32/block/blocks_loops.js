module.exports = function(Blockly){
  'use strict';

/*
Blockly.defineBlocksWithJsonArray([
// Block for repeat n times (external number).
{
    "type": "controls_repeat_ext",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
  // Block for repeat n times (internal number).
  // The 'controls_repeat_ext' block is preferred as it is more flexible.
  {
    "type": "controls_repeat",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "field_number",
      "name": "TIMES",
      "value": 10,
      "min": 0,
      "precision": 1
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
  // Block for 'do while/until' loop.
  {
    "type": "controls_whileUntil",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
          ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]
        ]
      },
      {
        "type": "input_value",
        "name": "BOOL",
        "check": "Boolean"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
    "extensions": ["controls_whileUntil_tooltip"]
  },
  // Block for 'for' loop.
  {
    "type": "controls_for",
    "message0": "%{BKY_CONTROLS_FOR_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VAR",
        "check": "Variable"
      },
      {
        "type": "input_value",
        "name": "FROM",
        "check": "Number",
        "align": "LEFT"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "Number",
        "align": "LEFT"
      },
      {
        "type": "input_value",
        "name": "BY",
        "check": "Number",
        "align": "LEFT"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_FOR_HELPURL}",
    "extensions": [
      "controls_for_tooltip"
    ]
  },
  // Block for 'for each' loop.
  {
    "type": "controls_forEach",
    "message0": "%{BKY_CONTROLS_FOREACH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VAR",
        "check": "Variable"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_FOREACH_HELPURL}",
    "extensions": [
      "controls_forEach_tooltip"
    ]
  },
  // Block for flow statements: continue, break.
  {
    "type": "controls_flow_statements",
    "message0": "%1",
    "args0": [{
      "type": "field_dropdown",
      "name": "FLOW",
      "options": [
        ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}", "BREAK"],
        ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}", "CONTINUE"]
      ]
    }],
    "previousStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}",
    "extensions": [
      "controls_flow_tooltip",
      "controls_flow_in_loop_check"
    ]
  }
]);*/

};