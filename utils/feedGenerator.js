export default function simpleSyndication (type, content, schema) {

  console.log(type, content, schema)

  if (type === 'xml') {}

  if (type === 'json') {}

  return new Error('invalid or missing type')
}