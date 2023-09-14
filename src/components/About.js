import React from 'react';
import './About.css'; // Import your CSS file for styling
import profileImage from './profile-image.png'; // Import your profile image

const About = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-header">
        <div className="profile-image">
          <img src={profileImage} alt="Your Name" />
        </div>
        <h2>About Me</h2>
      </div>
      <div className="about-me-content">
        <p>
          Hello! My name is Chiman Deka. I have am Final year undergraduate student doing my B.tech in Electronics and telecommunication Engineering. s a highly motivated and detail-oriented individual, I am passionate about software development and committed to delivering high-quality solutions. With a keen interest in emerging technologies and a solid foundation in programming, I am constantly striving to expand my skills and knowledge in
the field. My goal is to become a proficient software developer, who can leverage technology to solve real-world problems and create innovative
solutions. Feel free to reach out to me:
        </p>
        <ul>
          <li>Email: dekaonbest1323@gmail.com</li>
          <li>Phone: 8638039865</li>
          <li>
            LinkedIn: www.linkedin.com/in/chiman-deka-642a8514a
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
