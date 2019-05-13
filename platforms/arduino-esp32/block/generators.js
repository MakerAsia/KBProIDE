module.exports = function(Blockly){
'use strict';
if(!Blockly.dbNameType){
    Blockly.dbNameType = {};
}

Blockly.JavaScript.init = function(workspace) {
    Blockly.JavaScript.definitions_ = Object.create(null);
    Blockly.JavaScript.functionNames_ = Object.create(null);
    
    if (!Blockly.JavaScript.variableDB_) {
        Blockly.JavaScript.variableDB_ =
            new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_);
    } else {
        Blockly.JavaScript.variableDB_.reset();
    }
    Blockly.JavaScript.variableDB_.setVariableMap(workspace.getVariableMap());
    var defvars = [];
    // Add developer variables (not created or named by the user).
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
		let devVarInfo = Blockly.JavaScript.variableDB_.variableMap_.getVariableById(devVarList[i].getId());
		if(devVarInfo && !(devVarInfo.type.toLowerCase().startsWith("plugin."))){
			//if we found plugin variable let ignore them
			defvars.push(Blockly.JavaScript.variableDB_.getName(devVarList[i],
				Blockly.Names.DEVELOPER_VARIABLE_TYPE));
		}
    }
    // Add user variables, but only ones that are being used.
    var variables = Blockly.Variables.allUsedVarModels(workspace);
    for (var i = 0; i < variables.length; i++) {
		let devVarInfo = Blockly.JavaScript.variableDB_.variableMap_.getVariableById(variables[i].getId());
		if(devVarInfo && !(devVarInfo.type.toLowerCase().startsWith("plugin."))){
			//if we found plugin variable let ignore them
			defvars.push(Blockly.JavaScript.variableDB_.getName(variables[i].getId(),
            	Blockly.Variables.NAME_TYPE));
		}
        
	}
    // Declare all of the variables.
    if (defvars.length) {
		var declareVar = [];
		for(var i =0;i<defvars.length;i++){
			let vType = (defvars[i] in Blockly.dbNameType) ? Blockly.dbNameType[defvars[i]].type : "int";
			declareVar.push("#VARIABLE"+vType + " " + defvars[i] + ";#END");

			Blockly.dbNameType[defvars[i]] = {
				name : defvars[i], type : vType
			};
		}
		Blockly.JavaScript.definitions_['variables'] =	declareVar.join("\n");
    }
};

Blockly.JavaScript['arduino_init'] = function(block) {
	var statements_code = Blockly.JavaScript.statementToCode(block, 'code');
	var code = `
#BLOCKSETUP
  ${statements_code}
#END
`;
	return code;
};
  
Blockly.JavaScript['arduino_loop'] = function(block) {
	var statements_code = Blockly.JavaScript.statementToCode(block, 'code');	
	return statements_code;
};


// =============================================================================
// basic
// =============================================================================

Blockly.JavaScript['basic_delay'] = function(block) {
	return 'vTaskDelay(' + parseInt(1000 * parseFloat(block.getFieldValue('VALUE'))) + ' / portTICK_RATE_MS);\n';
};

Blockly.JavaScript['basic_forever'] = function(block) {
	return 'while(1) {\n' + Blockly.JavaScript.statementToCode(block, 'HANDLER') + '}\n';
};

// =============================================================================
// math
// =============================================================================
/*Blockly.JavaScript['math_number'] = function(block) {
	return [
		'(double)' + block.getFieldValue('VALUE'),
		Blockly.JavaScript.ORDER_ATOMIC
	];
};*/

Blockly.JavaScript['math_arithmetic'] = function(block) {
	// Basic arithmetic operators, and power.
	var OPERATORS = {
		ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
		MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
		MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
		DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
//		POWER: [' ^ ', Blockly.JavaScript.ORDER_EXPONENTIATION],
		MODULO: [' % ', Blockly.JavaScript.ORDER_DIVISION]
	};
	var tuple = OPERATORS[block.getFieldValue('OP')];
	var operator = tuple[0];
	var order = tuple[1];
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
	var code;
	/*// Power in JavaScript requires a special case since it has no operator.
	if (!operator) {
		code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
		return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}*/
	// modulo allow only integer
	if (block.getFieldValue('OP') == 'MODULO') {
		argument0 = '(int)(' + argument0 + ')';
		argument1 = '(int)(' + argument1 + ')';
	}
	code = argument0 + operator + argument1;

	return [code, order];
};

Blockly.JavaScript['math_variables_set'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['math_variables_get'] = function(block) {
	var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return [
		code,
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// logic
// =============================================================================
Blockly.JavaScript['controls_if'] = function(block) {
	var n = 0;
	var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
	var code = 'if (' + argument + ') {\n' + branch + '}';

	for (n = 1; n <= block.elseifCount_; n++) {
		argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
		branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
		code += ' else if (' + argument + ') {\n' + branch + '}';
	}

	if (block.elseCount_) {
		branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
		code += ' else {\n' + branch + '}';
	}

	return code + '\n';
};

Blockly.JavaScript['logic_compare'] = function(block) {
	// Comparison operator.
	var OPERATORS = {
		'EQ': '==',
		'NEQ': '!=',
		'LT': '<',
		'LTE': '<=',
		'GT': '>',
		'GTE': '>='
	};

	var operator = OPERATORS[block.getFieldValue('OP')];
	var order = (operator == '==' || operator == '!=') ?
		Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	var code = argument0 + ' ' + operator + ' ' + argument1;
	
	return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
	// Operations 'and', 'or'.
	var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
	var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :	Blockly.JavaScript.ORDER_LOGICAL_OR;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

	if (!argument0 && !argument1) {
		// If there are no arguments, then the return value is false.
		argument0 = 'false';
		argument1 = 'false';
	} else {
		// Single missing arguments have no effect on the return value.
		var defaultArgument = (operator == '&&') ? 'true' : 'false';
		if (!argument0) {
			argument0 = defaultArgument;
		}
		if (!argument1) {
			argument1 = defaultArgument;
		}
	}
	var code = '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';

	return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
	// Negation.
	var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || 'true';
	var code = '!' + argument0;

	return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
	// Boolean values true and false.
	var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';

	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// =============================================================================
// wait
// =============================================================================

// =============================================================================
// music
// =============================================================================

// =============================================================================
// sensor
// =============================================================================

// =============================================================================
// I/O
// =============================================================================

// =============================================================================
// advance
// =============================================================================
Blockly.JavaScript['advance_task'] = function(block) {
	// generate unique function name
	Blockly.JavaScript.taskNumber++;
	var funcName = 'vTask' + Blockly.JavaScript.taskNumber;

	var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
	if (Blockly.JavaScript.STATEMENT_PREFIX) {
		branch = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
				'\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
	}
	if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
		branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
			'\'' + block.id + '\'') + branch;
	}

	var code = 'void ' + funcName + '(void *pvParameters) {\n' +
		branch +
		'  // kill itself\n' +
		'  vTaskDelete(NULL);\n' +
		'}';
	code = Blockly.JavaScript.scrub_(block, code);
	// Add % so as not to collide with helper functions in definitions list.
	Blockly.JavaScript.definitions_['%' + funcName] = code;

	return null;
};

}