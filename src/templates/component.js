export const Component = (name, style, tsx) => {
    let importStyle = `import './${name}.${style}';`;
    if(tsx) {
    return `${style ? importStyle : ''}
import React from 'react';

export const ${name} = () => {
    return (
    <div className="${name}">
    <p>${name} works!</p>
    </div>
    );
}`;
    }

    return `${style ? importStyle : ''}
import React, { Component } from 'react';

export class ${name} extends Component {
    render() {
        return (
            <div className="${name}">
                <p>${name} works!</p>
            </div>
        );
    }
}`;
}