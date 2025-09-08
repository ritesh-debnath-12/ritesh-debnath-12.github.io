import './Footer.css'

/**
 * ### Footer Component
 * This is the Footer... it has links to legal documents.
 * @returns React.FC => \<Footer \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Made with ❤️ by Neko</p>
        <p className="footer-text"><a href="/legal/LICENSE.txt" download>LICENSE</a></p>
        <p className="footer-text"><a href="/legal/COPYRIGHT.txt" download>COPYRIGHT</a></p>
      </div>
    </footer>
  )
}

export default Footer
