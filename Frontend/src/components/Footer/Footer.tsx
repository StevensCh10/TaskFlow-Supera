import './Footer.css'

interface FooterProps {
  color: string;
}

const Footer: React.FC<FooterProps> = ({ color }) => {
    return(
      <div className="footer-container">
        <div className='copyright'>
          <p style={{color: color}}>TaskFlow &copy; 2024 All rights reserved</p>
        </div>
      </div>
    );
}

export default Footer;