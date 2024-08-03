## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## useRef 

The useRef hook is used to create a mutable reference that can be attached to a DOM element or a value. In this case, containerRef is a reference to a div element. The useRef hook is initialized with null as the initial value.

 It allows you to access and modify the referenced element or value across renders without triggering a re-render.
In the provided code snippet, useRef is used to create a reference to a div element. The containerRef reference can be used to access and modify properties of the div element, such as its current property.
```JS
const containerRef = useRef<HTMLDivElement | null>(null)
```

## useInView

The useInView hook is not a built-in React hook, but it is commonly used in conjunction with React. It is typically provided by third-party libraries like react-intersection-observer or framer-motion.

The useInView hook tracks the visibility of an element within the viewport. It returns a boolean value indicating whether the element is currently in view or not. By default, it tracks the visibility of an element as it enters or leaves the window viewport. However, it can be customized with options to define the visibility threshold and other behaviors.


```js
const isInView = useInView(containerRef, { once: true, amount: 0.4 })
```
In the provided code snippet, useInView is used to track the visibility of the div element referenced by containerRef. The isInView variable will be true when the element is in view and false when it is not. The options object passed to useInView specifies that the element should be observed only once (once: true) and that it should be considered in view when at least 40% of it is visible (amount: 0.4).

## react-dropzone

react-dropzone library is used just to implement the drag & drop functionality in our application
```js


```

## Sharp
Sharp is a module for handling images(Image Processing) it is used to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.


## Prisma
Whenever we are changing the prisma model configuration we have to
```sh
npx prisma db push
```
