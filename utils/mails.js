const accessDataMail = (password) => {
  return `<div style="padding: 20px; text-align: center">
      <p style="color: #2a2c36">
        <span style="color: #2a2c36"
          >A new password has been created for your Contact Book accoun.</span
        >
        <br /><br />
        Your password:
        <br />
        <b style="color: #1e6ccc; font-size: 24px">${password}</b>
      </p>
    </div>`;
};

module.exports = { accessDataMail };
