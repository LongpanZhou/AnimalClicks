
# [AnimalClicks](https://longpanzhou.github.io/#/animalclicks)
This is an npm package for adding animal effects to their clicks in their website.
![AnimalClicks](./imgs/demo.gif)

### Constructor
This is a singleton class, one instance of the class will be existing at all time.
```Javascript
constructor(innerText  = ['🦝'],
			time  =  2000,
			quality  =  1,
			angle  =  0,
			velocityX  =  0,
			velocityY  =  0,
			gravity  =  0.075,
			dx  =  10,
			dy  =  10,
			effects  = { random:  true, physics:  true, fade:  true, hideCursor:  true },
			fontSize  =  '24px')
```

- **`innerText`**: An array containing the characters or emojis that you want to use as the cursor's text. The cursor will switch between these as the text drops. Default is `['🦝']`.
- **`time`**: Duration in milliseconds for how long each text element remains visible before disappearing. If `effects.fade` is set to `true`, this value will be ignored since fading will handle the lifespan. Default is `2000` milliseconds.
- **`quality`**: Controls the density of the text drops. Higher values mean more text elements will be generated per drop. Default is `1`.
-  **`angle`**: The maximum random angle at which the text elements can rotate as they fall. A value of `0` means no rotation. Default is `0`.
- **`velocityX`**: The upper limit of the horizontal velocity (left/right movement) for each dropped text element. A higher value results in more spread horizontally. Default is `0`.
- **`velocityY`**: The upper limit of the vertical velocity (up/down movement) for each dropped text element. This affects how quickly the text falls. Default is `0`.
- **`gravity`**: Controls the rate of acceleration downward for each text element. Higher values simulate a stronger gravitational pull, making the elements fall faster. Default is `0.075`.
- **`dx`**: The horizontal offset applied to the starting position of each new text element. This is useful for positioning them relative to the cursor or click location. Default is `10`.
- **`dy`**: The vertical offset applied to the starting position of each new text element, influencing how far above or below the cursor or click location the text starts. Default is `10`.
- **`effects`**: An object that enables or disables specific effects:
  
    - **`random`**: If `true`, the `innerText` array will be randomized, picking a random element each time a text is dropped.  
      *Default*: `true`.

    - **`physics`**: If `true`, physics effects like gravity and velocity will be applied to the text elements, giving them a falling motion.  
      *Default*: `true`.

    - **`fade`**: If `true`, text elements will gradually fade out instead of disappearing suddenly when their `time` runs out.  
      *Default*: `true`.

    - **`hideCursor`**: If `true`, hides the default cursor when the effect is active, allowing the dropped text to act as the cursor replacement.  
      *Default*: `true`.

- **`fontSize`**: Specifies the font size of the text elements, determining how large or small they appear on the screen. Default is `'24px'`.

### How to update:
By creating a new class
```javascript
let  animalClicksInstance:  AnimalClicks  =  null;
animalClicksInstance  =  new  AnimalClicks(	innerText,
											time,
											quality,
											angle,
											velocityX,
											velocityY,
											gravity,
											dx,
											dy,
											effects);
```

By calling `update`
```javascript
AnimalClicks.instance.update({  innerText,
								time,
								quality,
								angle,
								velocityX,
								velocityY,
								gravity,
								dx,
								dy,
								effects,
								fontSize});
```
### Usage:

React.js, TypeScript, JavaScript

1. Import Library (You might need to add @ts-ignore)
```javascript
//@ts-ignore
import  AnimalClicks  from  './index.js';
```
2. Define class
```javascript
new AnimalClicks(['🦝'],
    2000, 1, 180, 2.5, 4.5, 0.075, 10, 10,
    {
    random: false,
    physics: true,
    fade: true,
    hideCursor: true
	},
	'24px'
);
```

HTML
3. Define class in `index.js` first
```javascript
new AnimalClicks(['🦝'],
    2000, 1, 180, 2.5, 4.5, 0.075, 10, 10,
    {
    random: false,
    physics: true,
    fade: true,
    hideCursor: true
	},
	'24px'
);
```
4. Embed JavaScript
```html
<script src="index.js"/>
```