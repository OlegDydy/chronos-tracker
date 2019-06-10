
export function toCamelCase(s){
  return s.replace(/_+(\w)/g, (_, $1) => $1.toUpperCase())
}

export function toSnakeCase(s){
  return s.replace(/([A-Z]+(?![a-z_])|[A-Z])/g, (_, $1) => `_${$1.toLowerCase()}`)
}
