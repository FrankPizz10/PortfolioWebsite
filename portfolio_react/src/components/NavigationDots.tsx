import React from 'react';

const NavigationDots: React.FC<{active: string}> = ({
    active,
}) => {
    return (
        <div className="app__navigation">
            {['home', 'about', 'skills', 'chess app', 'contact'].map((item, index) => (
                <a 
                href={item=='chess app' ? '#chessapp' : `#${item}`}
                key={item + index}
                className="app__navigation-dot"
                style={active === item ? { backgroundColor: '#00ddff'} : {}}
                />
            ))}
        </div>
    );
};

export default NavigationDots;