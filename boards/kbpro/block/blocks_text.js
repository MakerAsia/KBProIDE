module.exports = function(Blockly){
    'use strict';

Blockly.Constants.Text.HUE = 160;
var color1 = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for text value
  {
    "type": "text",
    "message0": "%1",
    "args0": [{
      "type": "field_string",
      "name": "TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": color1,
    "colourSecondary": color1,
    "colourTertiary": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      //"text_quotes",
      "parent_tooltip_when_inline"
    ]
  },
  /*{
    "type": "text_join",
    "message0": "",
    "output": "String",    
    "inputsInline": true,
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "mutator": "text_join_mutator"

  },*/
  {
    "type": "text_create_join_container",
    "message0": "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2",
    "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STACK"
    }],
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "text_create_join_item",
    "message0": "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "text_append",
    "message0": "%{BKY_TEXT_APPEND_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
    },
    {
      "type": "input_value",
      "name": "TEXT"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_TEXTS_HUE}",
    "extensions": [
      "text_append_tooltip"
    ]
  },
  {
    "type": "text_length",
    "message0": "%{BKY_TEXT_LENGTH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Number',
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_LENGTH_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_LENGTH_HELPURL}"
  },
  {
    "type": "text_isEmpty",
    "message0": "%{BKY_TEXT_ISEMPTY_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Boolean',
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_ISEMPTY_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_ISEMPTY_HELPURL}"
  },
  {
    "type": "text_indexOf",
    "message0": "%{BKY_TEXT_INDEXOF_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "END",
        "options": [
          [
            "%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}",
            "FIRST"
          ],
          [
            "%{BKY_TEXT_INDEXOF_OPERATOR_LAST}",
            "LAST"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "FIND",
        "check": "String"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_INDEXOF_HELPURL}",
    "inputsInline": true,
    "extensions": [
      "text_indexOf_tooltip"
    ]
  },
  {
    "type": "text_charAt",
    "message0": "%{BKY_TEXT_CHARAT_TITLE}", // "in text %1 %2"
    "args0": [
      {
        "type":"input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "WHERE",
        "options": [
          ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
        ]
      }
    ],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}",
    "inputsInline": true,
    "mutator": "text_charAt_mutator"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
Blockly.Blocks["text_join"] = {
  init: function(){    
    this.itemCount_ = 2;
    this.updateShape_();
    this.setInputsInline(true);
    //this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setOutput(true, 'String');
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  storeConnections_: function() {
    this.valueConnections_ = [];
    for (var i = 0; i < this.itemCount_; i++) {
      this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function() {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
    }
  },
  addItem_: function() {
    this.storeConnections_();
    var update = function() {
      this.itemCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
    // Add shadow block
    if (this.itemCount_ > 1) {
      // Find shadow type
      var firstInput = this.getInput('ADD' + 0);
      if (firstInput && firstInput.connection.targetConnection) {
        var newInput = this.getInput('ADD' + (this.itemCount_ - 1));
        var shadowInputDom = firstInput.connection.getShadowDom();
        if (shadowInputDom) {
          var shadowDom = document.createElement('shadow');
          var shadowInputType = shadowInputDom.getAttribute('type');
          shadowDom.setAttribute('type', shadowInputType);
          var shadowDomField = document.createElement('field');
          shadowDomField.setAttribute('name', 'NUM');
          shadowDom.appendChild(shadowDomField);
          if (shadowDom) {
            shadowDom.setAttribute('id', Blockly.utils.genUid());
            newInput.connection.setShadowDom(shadowDom);
            newInput.connection.respawnShadow_();
          }
        }
      }
    }
  },
  removeItem_: function() {
    this.storeConnections_();
    var update = function() {
      this.itemCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  update_: function(update) {
    Blockly.Events.setGroup(true);
    var block = this;
    var oldMutationDom = block.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    var savedRendered = block.rendered;
    block.rendered = false;
    if (update) update.call(this);
    this.updateShape_();
    block.rendered = savedRendered;
    block.initSvg();
    var group = Blockly.Events.getGroup();
    var newMutationDom = block.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      Blockly.Events.fire(new Blockly.Events.BlockChange(
          block, 'mutation', null, oldMutation, newMutation));
      setTimeout(function() {
        Blockly.Events.setGroup(group);
        block.bumpNeighbours_();
        Blockly.Events.setGroup(false);
      }, Blockly.BUMP_DELAY);
    }
    if (block.rendered) {
      block.render();
    }
    Blockly.Events.setGroup(false);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    var that = this;
    var add = function() {
      that.addItem_();
    };
    var remove = function() {
      that.removeItem_();
    };
    if (this.itemCount_) {
      if (this.getInput('EMPTY')) this.removeInput('EMPTY');
      if (!this.getInput('TITLE')) {
        this.appendDummyInput('TITLE')
            .appendField("Create input with");
      }
    } else {
      if (this.getInput('TITLE')) this.removeInput('TITLE');
      if (!this.getInput('EMPTY')) {
        this.appendDummyInput('EMPTY')
            .appendField("Create empty");
      }
    }
    var i = 0;
    // Add new inputs.
    for (i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        this.appendValueInput('ADD' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
    if (this.getInput('BUTTONS')) this.removeInput('BUTTONS');
    var buttons = this.appendDummyInput('BUTTONS');
    if (this.itemCount_ > 0) {      
      buttons.appendField(new Blockly.FieldImage("/static/icons/minus.png", 20, 20, "*",remove,true));
    }
    buttons.appendField(new Blockly.FieldImage("/static/icons/plus.png", 20, 20, "*", add,true));
    var showHorizontalList = this.itemCount_ <= 5;
    this.setInputsInline(showHorizontalList);    
  }
}
Blockly.Blocks['text_getSubstring'] = {
  /**
   * Block for getting substring.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],      
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']
    ];
    this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],      
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.appendValueInput('STRING')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n)
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
        function(value) {
          var newAt = (value == 'FROM_START') || (value == 'FROM_END');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(n, newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE' + n);
            return null;
          }
          return undefined;
        });

    this.getInput('AT' + n)
        .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
  }
};

Blockly.Blocks['text_changeCase'] = {
  /**
   * Block for changing capitalization.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
  }
};

Blockly.Blocks['text_trim'] = {
  /**
   * Block for trimming spaces.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
    this.setColour(Blockly.Msg.TEXTS_HUE);    
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField("trim");
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP);
  }
};

Blockly.Blocks['text_replace'] = {
  /**
   * Block for replacing one string with another in the text.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_REPLACE_MESSAGE0,
      "args0": [
        {
          "type": "input_value",
          "name": "FROM",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "TO",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": Blockly.Msg.TEXTS_HUE,
      "tooltip": Blockly.Msg.TEXT_REPLACE_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_REPLACE_HELPURL
    });
  }
};

}