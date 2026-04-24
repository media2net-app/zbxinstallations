function Footer({ t }) {
  return (
    <footer className="footer">
      <p>{t.footer.line1}</p>
      <p>{t.footer.line2}</p>
      <p>{t.footer.line3}</p>
      <p>
        © {new Date().getFullYear()} ZBX Installations. {t.footer.line4}
      </p>
    </footer>
  )
}

export default Footer
