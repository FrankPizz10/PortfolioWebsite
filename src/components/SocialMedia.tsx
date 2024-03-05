import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const SocialMedia = () => {
    return (
        <div className="app__social">
            <div>
                <a href='https://www.linkedin.com/in/frank-pizzella-8680461a0/' target='_blank' rel="noopener noreferrer">
                    <AiFillLinkedin />
                </a>
            </div>
            <div>
                <a href="https://github.com/FrankPizz10" target='_blank' rel="noopener noreferrer">
                    <AiFillGithub />
                </a>
            </div>
        </div>
    )
}

export default SocialMedia;