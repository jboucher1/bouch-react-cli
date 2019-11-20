export const UiComponent = (name, style) => {
let importStyle = `import './${name}.${style}';`;

return `${style ? importStyle : ''}
import React from 'react';

export const ${name} = () => {
        return (
            <p>${name} works!</p>
        );
}`
}