import React from "react";

import './Resume.scss';

const Resume = () => {
    return(
        <div className="app__resume app__flex">
            <div className="app__resume-education">
                <h1>Education</h1>
                <p>•	5th Year Candidate for B.S. in Computer Engineer and Computer Science</p>
                <p>•	Relevant Courses: Object Oriented Design, Algorithms and Data Structures, Web Development, 
                    Embedded Design: Enabling Robotics, Computer Systems, Fundamentals of Networks, Mobile Application Development</p>
                <p>•	N.U.in Program through Northeastern University: University College Dublin</p>
            </div>
            <div className="app__resume-experience">
                <h1>Experience</h1>
                <div className="nuvera">
                    <h3>Nuvera Fuel Cells <span>Software Engineering CO-OP	/ July 2022 – December 2022</span></h3>
                    <p className="core-skills">•	Python, Scikit-Learn, Pandas</p>
                    <p>•	Processed, filtered, and plotted 3D data for fuel cell engines</p>
                    <p>•	Discovered correlations between operating conditions and engine performance</p>
                    <p>•	Implemented machine learning regression algorithms to predict future engine performance</p>
                </div>
                <div className="philips">
                    <h3>Philips North America <span>Software Engineering CO-OP / July 2021 – December 2021</span></h3>
                    <p className="core-skills">•	C# (Object-Oriented), SQL, Azure DevOps</p>
                    <p>•	Enhanced an CI pipeline to test performance of Philips Patient Information Center (PIC IX)</p>
                    <p>•	Created Build and Release pipelines to deploy the PIC IX on a network system</p>
                    <p>•	Ran a series of tests on the product, collected metrics, and published results</p>
                    <p>•	Updated outdated SQL queries and C# scripts to increase traceability of errors and efficiency</p>
                    <p>•	Leveraged the Azure DevOps REST API to create a work item automatically </p>
                </div>
                <div className="insulet">
                    <h3>Insulet	 <span>System Test Engineer CO-OP / July 2021 – December 2021</span></h3>
                    <p className="core-skills">•	Python, Pandas</p>
                    <p>•	Generated Python scripts using Pandas and MATLAB scripts to analyze clinical data</p>
                    <p>•	Tested the Horizon Omnipod 5 System extensively in a formal Design Verification process</p>
                    <p>•	Designed a Continuous Glucose Monitor simulation </p>
                    <p>•	Tested key protocols such as algorithm function, insulin delivery, and pod communications</p>
                </div>
                <div className="chess-app">
                    <h3>Chess App <span>Design, Architect & Developer / September 2022 –</span></h3>
                    <p className="core-skills">•	React.js (Typescript)</p>
                    <p>•	Designed, architected, and developed an online chess application</p>
                    <p>•	Deployed using AWS S3, CloudFront, and route53</p>
                </div>
                <div className="muscle-map">
                    <h3>Muscle Map <span>Co - Architect & Developer / June 2022</span></h3>
                    <p className="core-skills">•	Java, Firebase</p>
                    <p>•	Worked with a partner to design a workout logging app</p>
                    <p>•	Stored user info and workout records on Cloud Firestore</p>
                    <p>•	Created a map of muscles which have ben engaged in recent workouts.</p>
                </div>
            </div>
        </div>
    );
}

export default Resume;