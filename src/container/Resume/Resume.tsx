import './Resume.scss';

const Resume = () => {
    return(
        <div className="app__resume app__flex">
            <a className="app__resume-download" href="https://frank-pizz-portfolio-website.s3.amazonaws.com/Frank_Pizzella_Resume_2024.pdf" download target="_blank" rel="noopener noreferrer">Download Resume PDF</a>
            <div className="app__resume-education">
                <h1>Education</h1>
                <ul>
                    <li><p>Graduated with B.S. in Computer Engineering and Computer Science maintaining a 3.3 GPA</p></li>
                    <li><p>Relevant Courses: Object Oriented Design, Algorithms and Data Structures, Web Development,
                            Embedded Design, Computer Systems, Fundamentals of Networks, Mobile App Development</p></li>
                    <li><p>N.U.in Program through Northeastern University: University College Dublin</p></li>
                </ul>
            </div>
            <div className="app__resume-experience">
                <h1>Work Experience</h1>
                <div className="nuvera">
                    <h3>City of Cambridge <span>Web Developer	/ May 2023 – Present</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of .NET MVC, Sitecore, Bitbucket, JavaScript</p></li>
                        <li><p>Improve, maintain, and modernize the main City of Cambridge website</p></li>
                        <li><p>Integrate Sitecore controls, renderings, and templates to allow staff to easily add content</p></li>
                        <li><p>Push new biweekly releases to the website to keep up with requests from various departments</p></li>
                        <li><p>Establish new testing suites including Visual Regression Testing</p></li>
                    </ul>
                </div>
                <div className="nuvera">
                    <h3>Nuvera Fuel Cells <span>Software Engineering CO-OP	/ July 2022 – December 2022</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of Python, Scikit-Learn, Pandas</p></li>
                        <li><p>Processed, filtered, and plotted 3D data for fuel cell engines</p></li>
                        <li><p>Discovered correlations between operating conditions and engine performance</p></li>
                        <li><p>Implemented machine learning regression algorithms to predict future engine performance</p></li>
                    </ul>
                </div>
                <div className="philips">
                    <h3>Philips North America <span>Software Engineering CO-OP / July 2021 – December 2021</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of C#, SQL, Azure DevOps</p></li>
                        <li><p>Enhanced an CI pipeline to test performance of Philips Patient Information Center (PIC IX)</p></li>
                        <li><p>Created Build and Release pipelines to deploy the PIC IX on a network system</p></li>
                        <li><p>Ran a series of tests on the product, collected metrics, and published results</p></li>
                        <li><p>Updated outdated SQL queries and C# scripts to increase traceability of errors and efficiency</p></li>
                        <li><p>Leveraged the Azure DevOps REST API to create a work item automatically </p></li>
                    </ul>
                </div>
                <div className="insulet">
                    <h3>Insulet	 <span>System Test Engineer CO-OP / July 2021 – December 2021</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of Python, Pandas, and MATLAB</p></li>
                        <li><p>Generated Python scripts using Pandas and MATLAB scripts to analyze clinical data</p></li>
                        <li><p>Tested the Horizon Omnipod 5 System extensively in a formal Design Verification process</p></li>
                        <li><p>Designed a Continuous Glucose Monitor simulation </p></li>
                        <li><p>Tested key protocols such as algorithm function, insulin delivery, and pod communications</p></li>
                    </ul>
                </div>
                <div className="insulet">
                    <h3>CodeWiz	 <span>Coding Coach / January 2023 – May 2023</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of Python, Roblox Studio, MCreator, Codio, Codesters</p></li>
                        <li><p>Coached kids from the ages of 8-14 on the fundamentals of Computer Science and 2D game design</p></li>
                        <li><p>Created curriculums and lesson plans to provide continuity in their learning experiences</p></li>
                    </ul>
                </div>
            </div>
            <div className='app__resume-skills'>
                <h1>Technical Projects</h1>
                <div className="muscle-map">
                    <h3>BeerPassport <span>Solo App Developer / June 2023 - Present</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of React Native, Node.js, Express, MySQL, Prisma, AWS, Docker</p></li>
                        <li><p>Developed an engaging beer tracking app on the App Store, powered by a custom AWS server</p></li>
                        <li><p>Created features enabling users to track tried beers, complete collections, and connect with friends</p></li>
                        <li><p>Configured a VPC to include an ECS cluster, EFS storage, and an Application Load Balancer</p></li>
                        <li><p>Implemented an admin frontend to continuously update the existing 5000 strong beer database</p></li>
                        <li><p>Leveraged Firebase for frontend sign-in with server middleware to validate authentication tokens</p></li>
                    </ul>
                </div>
                <div className="muscle-map">
                    <h3>Senior Capstone <span>HuskyCast Team Lead / January 2023 - May 2023</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of React.js (Typescript), Node.js, Express, PostgreSQL, Prisma, AWS</p></li>
                        <li><p>Contributed as team leader to complete a baseball tracking system for little leaguers</p></li>
                        <li><p>Created an Express Server, PostgreSQL database, AWS S3 bucket, and CloudFront distribution</p></li>
                        <li><p>Connected a React fronted for users to view baseball cards and stats</p></li>
                    </ul>
                </div>
            </div>
            <div className='app__resume-certifications'>
                <h1>Certifications</h1>
                <div className="certifications">
                    <ul>
                        <li><p>Sitecore 10 Developer Certification</p></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Resume;