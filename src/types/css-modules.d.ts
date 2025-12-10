// It tells TypeScript that *.module.css files export an object.
// It enables autocompletion when typing styles.
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>
  export default classes
}
