export const Test = (name, tsx) => {
    if(tsx){
        return `import React from 'react';
        import { render } from '@testing-library/react';
        import { ${name} } from './${name}';
        
        test('Renders react component', () => {
          const { container } = render(<${name} />);
          expect(container).toBeInTheDocument();
        });`;
    };

    return `import React from 'react';
    import ReactDOM from 'react-dom';
    import { ${name} } from './${name}';

    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<${name} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });`
}