declare module '*.png' {
	const value: string;
	export default value;
}
declare module '*.svg' {
	const content: string;
	export default content;
}
declare module '*.svg?url' { const src: string; export default src; }
declare module '*.png?url' { const src: string; export default src; }
declare module '*.jpg?url' { const src: string; export default src; }
