import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const SocialMedia = () => {
    return (
        <div className="app__social">
            <div>
                <a href='https://www.linkedin.com/in/frank-pizzella-8680461a0/'>
                    <AiFillLinkedin />
                </a>
            </div>
            <div>
                <a href="https://github.com/FrankPizz10">
                    <AiFillGithub />
                </a>
            </div>
        </div>
    )
}

export default SocialMedia;