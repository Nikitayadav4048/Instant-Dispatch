import "./footer.css"
import logo from '../../assets/logo-final.png';
const Footer = () => {
  return (
    <div className="footer w-full pb-10 pt-6  ">


        <div className="f-section1 flex flex-wrap gap-2 ms-20  ">
<div className="part1  md:w-96">
{/* <h2 className="mb-6 ">INSTANT DISPATCH</h2> */}
  <img src={logo} alt="logo"  className = "nav-logo nav-brand mb-4"/>
<p className="footer-p">Instant Dispatch was founded with the vision to redefine
   the dispatch service industry. By leveraging cutting-edge 
   technology and a team of dedicated professionals, we ensure 
   that your deliveries are always on time and handled with the
    utmost care.</p>
    <ul className="social-icons flex flex-wrap gap-3  mt-4 ">
        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
    </ul>
</div>
<div className="part2 flex flex-wrap gap-28 pt-20">

<ul className="footer-list">
<li><a href="#"></a>Home</li>
      <li><a href="#"></a>About us</li>
      <li><a href="#"></a>Services</li>
      <li><a href="#"></a>Contact us</li>
  </ul>

  <ul className="footer-list">
      <li><a href="#"></a>Same-Day Delivery</li>
      <li><a href="#"></a>Real-Time Tracking</li>
      <li><a href="#"></a>Customized Solutions</li>
      <li><a href="#"></a>Efficient Dispatch Management</li>
  </ul>

  <ul className="footer-list">
      <li><a href="#"></a>Customer focus</li>
      <li><a href="#"></a>Innovation</li>
      <li><a href="#"></a>Integrity</li>
  </ul>

  <ul className="footer-list">
      <li><a href="#"></a>FAQ</li>
      <li><a href="#"></a>Support</li>
      <li><a href="#"></a>Terms </li>
      <li><a href="#"></a>Privacy Policy</li>
  </ul>

   

</div>

        </div>

       <div className="mt-10">
       <hr className="hori-line"></hr>
       <p className="ms-20"> &copy; 2024 Instant Dispatch. All rights reserved.</p>
       </div>
    </div>
  )
}

export default Footer
