import './Resume.scss';

const Resume = () => {
    return(
        <div className="app__resume app__flex">
            <a className="app__resume-download" href={process.env.REACT_APP_RESUME_URL} download target="_blank" rel="noopener noreferrer">Download Resume PDF</a>
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
                        <li><p>Utilize tech stack consisting of .NET MVC, Sitecore, Bitbucket, JavaScript, Azure</p></li>
                        <li><p>Improve, maintain, and modernize the main City of Cambridge website</p></li>
                        <li><p>Integrate Sitecore controls, renderings, and templates to allow staff to add content</p></li>
                        <li><p>Develop full-stack applications such as financial disclosure software for electoral candidates</p></li>
                        <li><p>Modernize our infrastructure by moving applications to Azure with a hybrid-cloud approach</p></li>
                    </ul>
                </div>
                <div className="nuvera">
                    <h3>Nuvera Fuel Cells <span>Software Engineering CO-OP	/ July 2022 – December 2022</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of Python, Scikit-Learn, Pandas</p></li>
                        <li><p>Processed, filtered, and plotted 3D data for fuel cell engine performance</p></li>
                        <li><p>Applied ML regression algorithms to find correlations between conditions and engine performance</p></li>
                    </ul>
                </div>
                <div className="philips">
                    <h3>Philips North America <span>Software Engineering CO-OP / July 2021 – December 2021</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of C#, SQL, Azure DevOps</p></li>
                        <li><p>Enhanced a CI pipeline to test the performance of Philips Patient Information Center (PIC IX)</p></li>
                        <li><p>Created Build and Release pipelines to deploy the PIC IX on a network system</p></li>
                        <li><p>Modernized deprecated SQL queries and C# scripts to increase traceability of errors and efficiency</p></li>
                    </ul>
                </div>
                <div className="insulet">
                    <h3>Insulet	 <span>System Test Engineer CO-OP / July 2021 – December 2021</span></h3>
                    <ul>
                        <li><p>Utilized tech stack consisting of Python, Pandas, and MATLAB</p></li>
                        <li><p>Generated Python scripts using Pandas and MATLAB scripts to analyze clinical data</p></li>
                        <li><p>Tested the Horizon Omnipod 5 System extensively in a formal Design Verification process</p></li>
                        <li><p>Designed a Continuous Glucose Monitor simulation using Python</p></li>
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
                        <li><p>Developed an open-source beer tracking app on the App Store, powered by a custom AWS server</p></li>
                        <li><p>Created features for beer tracking, collection completion, and social connectivity</p></li>
                        <li><p>Configured AWS VPC with ECS cluster, EFS storage, and Application Load Balancer</p></li>
                        <li><p>Implemented an admin frontend for ongoing updates to a 6,000+ beer database</p></li>
                        <li><p>Leveraged Firebase for frontend authentication with JWT validation in server-side middleware</p></li>
                    </ul>
                </div>
            </div>
            <div className='app__resume-certifications'>
                <h1>Additional</h1>
                <div className="certifications">
                    <ul>
                        <li><p><strong>Volunteering: </strong>Assisted the Maverick Foundation as a Web Consultant to help them launch a new website</p></li>
                        <li><p><strong>Certifications: </strong>Sitecore 10, Microsoft Certified: Azure Fundamentals</p></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Resume;