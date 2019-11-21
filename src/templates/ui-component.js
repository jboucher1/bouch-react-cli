export const UiComponent = (name, style) => {
let importStyle = `import './${name}.${style}';`;

return `${style ? importStyle : ''}
import React from 'react';

export const ${name} = () => {
        return (
            <div className="${name}">
                <p>${name} works!</p>
            </div>
        );
}`
}