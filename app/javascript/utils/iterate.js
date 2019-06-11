export default function(obj, func){
  const result = [];
  for (let key in obj){
    result.push(func(obj[key], key, result))
  }
  return result;
}
