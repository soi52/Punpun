declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
    actpage?: string;
  }
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
