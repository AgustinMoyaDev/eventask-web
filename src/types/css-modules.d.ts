// It tells TypeScript that *.module.css files export an object.
// It enables autocompletion when typing styles.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
