export function delayImport<T>(factory: () => Promise<T>, ms = 2000): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      factory().then(resolve)
    }, ms)
  })
}
