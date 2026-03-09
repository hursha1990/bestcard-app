const Footer = () => {
  let thisYear = new Date().getFullYear();
  return (
    <footer>
      <div>&copy; {thisYear} BestCard</div>
    </footer>
  );
};

export default Footer;
