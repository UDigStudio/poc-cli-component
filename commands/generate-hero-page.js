
const pascalCase = require('pascal-case').pascalCase
const formatFile = require('../prettier/format-file').formatFile

module.exports = {
  name: 'generate-hero-page',
  alias: ['ghp'],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
      prompt,
    } = toolbox

    const results = await prompt.ask([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      }
    ])

    const name = results.name
    const properName = pascalCase(name)

    await generate({
      template: 'hero-page-template.js.ejs',
      target: `src/pages/${name}.jsx`,
      props: { name, properName },
    }).then(() => {
      return formatFile(
        `src/pages/${name}.jsx`,
        `src/pages/${name}.jsx`,
      )
    })

    info(`Generate hero page at pages/${name}.jsx`)
  },
}
