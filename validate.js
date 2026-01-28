#!/usr/bin/env node

/**
 * Mission Control Dashboard Data Validator
 * 
 * Usage: node validate.js [data-file]
 * 
 * Validates data.json against schema.json and provides helpful error messages.
 */

const fs = require('fs');
const path = require('path');

// Simple JSON Schema validator
class Validator {
  constructor(schema) {
    this.schema = schema;
    this.errors = [];
  }

  validate(data, schema = this.schema, path = 'root') {
    this.errors = [];
    this._validate(data, schema, path);
    return {
      valid: this.errors.length === 0,
      errors: this.errors
    };
  }

  _validate(data, schema, path) {
    // Check type
    if (schema.type) {
      const actualType = Array.isArray(data) ? 'array' : typeof data;
      if (actualType !== schema.type) {
        this.errors.push(`${path}: Expected type '${schema.type}', got '${actualType}'`);
        return;
      }
    }

    // Check required properties
    if (schema.required && schema.type === 'object') {
      for (const prop of schema.required) {
        if (!(prop in data)) {
          this.errors.push(`${path}: Missing required property '${prop}'`);
        }
      }
    }

    // Check properties
    if (schema.properties && schema.type === 'object') {
      for (const [key, value] of Object.entries(data)) {
        const propSchema = schema.properties[key];
        if (!propSchema && schema.additionalProperties === false) {
          this.errors.push(`${path}: Unknown property '${key}' (not allowed by schema)`);
        } else if (propSchema) {
          // Resolve $ref
          const resolvedSchema = propSchema.$ref 
            ? this._resolveRef(propSchema.$ref) 
            : propSchema;
          this._validate(value, resolvedSchema, `${path}.${key}`);
        }
      }
    }

    // Check array items
    if (schema.items && Array.isArray(data)) {
      data.forEach((item, index) => {
        const itemSchema = schema.items.$ref 
          ? this._resolveRef(schema.items.$ref) 
          : schema.items;
        this._validate(item, itemSchema, `${path}[${index}]`);
      });

      // Check minItems
      if (schema.minItems !== undefined && data.length < schema.minItems) {
        this.errors.push(`${path}: Array has ${data.length} items, minimum is ${schema.minItems}`);
      }
    }

    // Check enum
    if (schema.enum && !schema.enum.includes(data)) {
      this.errors.push(`${path}: Value '${data}' not in allowed values: ${schema.enum.join(', ')}`);
    }

    // Check pattern
    if (schema.pattern && typeof data === 'string') {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(data)) {
        this.errors.push(`${path}: Value '${data}' does not match pattern ${schema.pattern}`);
      }
    }

    // Check minLength
    if (schema.minLength !== undefined && typeof data === 'string') {
      if (data.length < schema.minLength) {
        this.errors.push(`${path}: String length ${data.length} is less than minimum ${schema.minLength}`);
      }
    }

    // Check min/max
    if (schema.minimum !== undefined && typeof data === 'number') {
      if (data < schema.minimum) {
        this.errors.push(`${path}: Value ${data} is less than minimum ${schema.minimum}`);
      }
    }
    if (schema.maximum !== undefined && typeof data === 'number') {
      if (data > schema.maximum) {
        this.errors.push(`${path}: Value ${data} is greater than maximum ${schema.maximum}`);
      }
    }

    // Check format (basic date-time check)
    if (schema.format === 'date-time' && typeof data === 'string') {
      const date = new Date(data);
      if (isNaN(date.getTime())) {
        this.errors.push(`${path}: Invalid date-time format '${data}'`);
      }
    }
  }

  _resolveRef(ref) {
    // Simple $ref resolver for #/definitions/...
    const parts = ref.split('/');
    let current = this.schema;
    for (let i = 1; i < parts.length; i++) {
      current = current[parts[i]];
    }
    return current;
  }
}

// Main function
function main() {
  const dataFile = process.argv[2] || 'data.json';
  const schemaFile = 'schema.json';

  console.log('🔍 Mission Control Dashboard Validator\n');

  // Load schema
  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
    console.log(`✓ Loaded schema: ${schemaFile}`);
  } catch (error) {
    console.error(`✗ Failed to load schema: ${error.message}`);
    process.exit(1);
  }

  // Load data
  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    console.log(`✓ Loaded data: ${dataFile}`);
  } catch (error) {
    console.error(`✗ Failed to load data: ${error.message}`);
    if (error instanceof SyntaxError) {
      console.error('\n⚠️  JSON Syntax Error - check for:');
      console.error('  - Missing or extra commas');
      console.error('  - Unmatched brackets/braces');
      console.error('  - Unescaped quotes in strings');
    }
    process.exit(1);
  }

  console.log('\n📋 Validating data structure...\n');

  // Validate
  const validator = new Validator(schema);
  const result = validator.validate(data);

  if (result.valid) {
    console.log('✅ VALIDATION PASSED!\n');
    console.log('Summary:');
    console.log(`  - Projects: ${data.projects.length}`);
    console.log(`  - Sean's todos: ${data.todos.sean.length}`);
    console.log(`  - Jon's todos: ${data.todos.jon.length}`);
    console.log(`  - Last update: ${data.lastUpdate}`);
    process.exit(0);
  } else {
    console.log('❌ VALIDATION FAILED!\n');
    console.log('Errors found:');
    result.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
    console.log('\n💡 Common fixes:');
    console.log('  - Check that all required fields are present');
    console.log('  - Verify field names match exactly (case-sensitive)');
    console.log('  - Ensure arrays have at least one item where required');
    console.log('  - Check that enums match allowed values (green/yellow/red, urgent/normal/low)');
    console.log('  - Verify ID formats (sean-1, jon-2, proj-1, etc.)');
    console.log('\n📖 See SCHEMA.md for full documentation');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { Validator };
