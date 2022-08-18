export const UiComponent = (name, style) => {
let importStyle = `import './${name}.${style}';`;

return `${style ? importStyle : ''}
import React, {ReactElement} from 'react';

export const ${name} = (): ReactElement => {
        return (
            <div className="${name}">
                <p>${name} works!</p>
            </div>
        );
}`
};