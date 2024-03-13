interface MessageParams {
  [key: string]: string | number
}

export function replaceParams(message: string, params?: MessageParams): string {
  if (!params) {
    return message
  }
  const regex = new RegExp('(' + Object.keys(params).join('|') + ')', 'g')

  return message.replace(
    regex,
    (substring: string, key: string) => params[key].toString() || substring
  )
}
