const plugin = require('../index.js')
const pluginTester = require('babel-plugin-tester')

const code = `
var a = process.env.DEFAULT_1;
var b = process.env.DEFAULT_2;
var c = process.env.VAR_1;
var d = process.env.VAR_DEFAULT_1;`

pluginTester({
  plugin,
  pluginName: 'babel-plugin-inline-env',
  pluginOptions: {path: './.env'},

  tests: [
    {
      title: 'Transform',
      code,
      output: `
        var a = process && process.env && process.env.DEFAULT_1 || "default1";
        var b = process && process.env && process.env.DEFAULT_2 || "default2";
        var c = process && process.env && process.env.VAR_1 || "var1";
        var d = process && process.env && process.env.VAR_DEFAULT_1 || "var1_default1_default2";
      `,
    },
    {
      title: 'Snapshot',
      snapshot: true,
      code,
    },
  ],
})
