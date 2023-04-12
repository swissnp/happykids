const Footer = () => {
  return (
    <footer className="footer bg-base-200 p-10 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <a className="link-hover link">Branding</a>
        <a className="link-hover link">Design</a>
        <a className="link-hover link">Marketing</a>
        <a className="link-hover link">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link-hover link">About us</a>
        <a className="link-hover link">Contact</a>
        <a className="link-hover link">Jobs</a>
        <a className="link-hover link">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link-hover link">Terms of use</a>
        <a className="link-hover link">Privacy policy</a>
        <a className="link-hover link">Cookie policy</a>
      </div>
      <div>
        <span className="footer-title">Newsletter</span>
        <div className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="username@site.com"
              className="input-bordered input w-full pr-16"
            />
            <button className="btn-primary btn absolute right-0 top-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
