export const Component = (name, style) => {
    let importStyle = `import './${name}.${style}';`;

return `${style ? importStyle : ''}
import React, { Component } from 'react';

export class ${name} extends Component {
    render() {
        return (
            <p>${name} works!</p>
        );
    }
}`
}