import { Link } from 'react-router-dom';
import '../index.css';

function Resume() {
  return (
    <div className="resume-container">
      <Link to="/" className="back-button">Home</Link>
      
      <div className="contact-info">
        <a href="tel:1-775-287-1631">(775) 287-1631</a>
        <br/>
        <a href="mailto:Granttscott@gmail.com">Granttscott@gmail.com</a>
      </div>

      <h1 className="resume-header">Grant Scott</h1>

      <div className="resume-body">
        <h4 className="objective">
          Driven to achieve excellence in any task presented. Exceptional customer satisfaction qualities. Strong aptitude for developing new skills.
        </h4>

        <hr/>
        <h2>EXPERIENCE</h2>
        <hr/>

        <div className="experience-section">
          <h3>The Change Companies, Carson City, Nevada - Account Services Engineer</h3>
          <h4>May 2023 - Present</h4>
          <ul>
            <li>Manage customer ticket portal and help center</li>
            <li>Triage support tickets and serve as liaison with software engineering team</li>
            <li>Troubleshoot technical issues to improve the customer experience and fix bugs</li>
            <li>Manage ecommerce store</li>
          </ul>

          <h3>Account Services Specialist - Training Coordinator</h3>
          <h4>October 2022 - May 2023</h4>
          <ul>
            <li>Coordinate training logistics for Interactive Journaling training to provide a positive customer experience</li>
            <li>Provide customer service over the phone and via email as needed for journaling and eTraining</li>
            <li>Review and place orders</li>
          </ul>

          <h3>Account Services Specialist</h3>
          <h4>June 2022 - October 2022</h4>
          <ul>
            <li>Answer incoming calls and connect to appropriate team members</li>
            <li>Place and review customer orders</li>
            <li>Provide exceptional customer service over the phone and through email</li>
          </ul>

          <h3>Titan Construction Supply, Reno, Nevada — Inside Sales/Counter Lead</h3>
          <h4>March 2021 - June 2022</h4>
          <ul>
            <li>Fulfilled customer needs per incoming and outgoing calls and direct floor sales</li>
            <li>Responsible for customer satisfaction tasks such as showroom visual appeal, time management and order corrections in the most respectable manner</li>
            <li>Often worked overtime during covid period to maintain company success</li>
          </ul>

          <h3>Titan Construction Supply, Reno, Nevada — Warehouse Operative</h3>
          <h4>June 2019 - March 2021</h4>
          <ul>
            <li>Became familiar with products and committed product location to memory in order to increase pace and accuracy of work</li>
            <li>Utilized warehouse machinery to increase efficiency of work</li>
          </ul>

          <h3>Boreal Mountain Resort, Soda Springs California — Cashier</h3>
          <h4>September 2018 - December 2018</h4>
          <ul>
            <li>Assisted a variety of customers with a range of services such as: Rentals, Season/Day ticket sales, and answered the customer question phone line</li>
            <li>Consistently punctual, regardless of long commute</li>
          </ul>
        </div>

        <hr/>
        <h2>EDUCATION</h2>
        <hr/>

        <div className="education-section">
          <h3>University of Nevada, Reno Nevada — Neuroscience</h3>
          <h4>August 2018 - May 2022</h4>
          <h4>Bachelor's in Neuroscience, 3.7 GPA</h4>
          <h4>Relevant completed coursework -</h4>
          <ul>
            <li>Biochemistry: Familiar with common biological pathways and cycles</li>
            <li>Virtual Reality: Know both the perceptual and technological aspects of Virtual Reality systems</li>
            <li>Organic Chemistry I&II: Understand how drugs and other molecules interact and behave</li>
            <li>Neurobiology: Deep understanding of pain pathway and why a person may feel pain</li>
            <li>Experimental Psychology: Familiarized with every step in the research procedure</li>
          </ul>

          <h3>Galena High School, Reno Nevada — High School Diploma, Honors</h3>
          <h4>August 2014 - June 2018</h4>
          <ul>
            <li>Participated in S.T.E.M. program with focus on environmental engineering.</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .resume-container {
          text-align: left;
          color: black;
          padding: 20px;
        }
        
        .back-button {
          display: inline-block;
          margin-bottom: 20px;
        }

        .contact-info {
          margin-bottom: 20px;
        }

        .resume-header {
          color: black;
        }

        .objective {
          text-align: center;
        }

        li {
          font-family: serif;
        }

        h2 {
          color: black;
        }

        h3 {
          color: black;
          font-family: serif;
        }

        h4 {
          color: black;
          font-family: serif;
        }
      `}</style>
    </div>
  );
}

export default Resume;