
## Getting Started

This tutorial is meant for people who have a (very) basic level of react knowledge. 
One should know what a component is and what html elements are. Also one should not be surprised having to read actual react syntax (.tsx files).
To start off make sure to install all packages.  
then run `npm run dev`  
And open a browser and go to localhost:3000

### File structure

The tutorials are located under the "tutorial" directory.  
The main files in that directory can be ignored initially, but each chapter has its own subdirectory.
The names of the chapters follow the names of the tutorial (tabs)

Ideally one first listens to each part, read the description and then look into the code how this is actually implement.

### Extra information

The tutorial is based on self explaining code, where each chapter is also written using the ideas of that chapteer.
It consists of two parts, a basis part and an advanced tutorial part. 
The advanced tutorial is meant to follow directly after understand the basis, and has the same chapters; they can be access by selecting the flag.

The files are meant to be self explanatory, with only little external help required. Some general structures of the tutorial that might cause confusion:
Most tutorial-components start with, this can be ignored (until the chapter about contexts).
```jsx
const advanced = useContext(AdvancedCtx);
```
Further more a lot of elements in the tutorial are called `AbcDiv`, ie `ElemDiv` and `TextDiv`. These are so called "styled components". 
The way these work is out of scope of this tutorial, and one should just consider them to be "fancy div elements".

Finally parts of each chapter might be between:

```jsx
{/* ADVANCED */}
{/* END-ADVANCED */}
```
or 
```jsx
/* ADVANCED */
/* END-ADVANCED */
```
These are sections for the "advanced tutorial", and should be ignored when reading the basic tutorial.