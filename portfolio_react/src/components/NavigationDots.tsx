import React from 'react';

export const NavigationDots: React.FC<{active: string}> = ({
    active,
}) => {
    return (
        <div className="app__navigation">
            {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
                <a 
                href={`#${item}`}
                key={item + index}
                className="app__navigation-dot"
                style={active === item ? { backgroundColor: '#313BAC'} : {}}
                />
            ))}
        </div>
    );
};