// @ts-check

import { transformers } from './cli-transformers';

/**
 * Collection of keyword definitions to add to the singleton `Ajv` instance.
 * @type {Record<string,KeywordDefinition>}
 */
export const keywords = {
  /**
   * Keyword to provide a list of command alias names for the CLI.
   *
   * If defined, there must be at least one item in the array and it must be non-empty.
   * All items in the array must be unique.
   *
   * @todo Avoid alias collisions!
   * @type {KeywordDefinition}
   * @example
   * {appiumCliAliases: ['B', 'bobby', 'robert']}
   */
  appiumCliAliases: {
    keyword: 'appiumCliAliases',
    metaSchema: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1,
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
  /**
   * Keyword to provide the name of the property in the destination (parsed
   * args) object. By default, this value will be whatever the property name is,
   * but camel-cased. If a flag needs something _other_ than just camel-casing,
   * use this.
   * @type {KeywordDefinition}
   * @example
   * // for prop 'no-color'
   * {appiumCliDest: 'NOCOLOR'} // value will be stored as property `NOCOLOR` instead of `noColor`
   */
  appiumCliDest: {
    keyword: 'appiumCliDest',
    metaSchema: {
      type: 'string',
      minLength: 1,
    },
  },

  /**
   * CLI-specific description of the property.  Sometimes the allowed type can
   * be different enough on the CLI that providing a description written for a
   * config file context wouldn't make sense.
   * @type {KeywordDefinition}
   * @example
   * {appiumCliDescription: 'This is a comma-delimited string, but in the config file it is an array'}
   */
  appiumCliDescription: {
    keyword: 'appiumCliDescription',
    schemaType: 'string',
    metaSchema: {
      type: 'string',
      minLength: 1,
    },
  },
  /**
   * Transformers for CLI args. These usually take strings then do something with them, like
   * read a file or parse further.
   * @type {KeywordDefinition}
   */
  appiumCliTransformer: {
    keyword: 'appiumCliTransformer',
    metaSchema: {
      type: 'string',
      enum: Object.keys(transformers),
    },
  },
};

/**
 * These are the valid values for the `appiumCliTransformer` keyword.
 * Unfortunately, TS cannot infer this in a JS context.  In TS, we'd use
 * `as const` when defining `argTransformers`, then get `keyof typeof argTransformers`. alas.
 * @typedef {'csv'|'json'} AppiumCliTransformerName
 */

/**
 * These are the custom keywords that Appium recognizes
 * @typedef {Object} AppiumJSONSchemaKeywords
 * @property {string} [appiumCliDest]
 * @property {string} [appiumCliDescription]
 * @property {string[]} [appiumCliAliases]
 * @property {AppiumCliTransformerName} [appiumCliTransformer]
 */


/**
 * @typedef {import('ajv').KeywordDefinition} KeywordDefinition
 */