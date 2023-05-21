const accessDataMail = (password) => {
  return `<div style="padding: 20px; text-align: center;">
        <p style="color: #2a2c36">
          <span style="color: #2a2c36">Congratulations! You have signed up for Contact Book.</span>
          <br />
          Your password: 
          <b style=" color: #1e6ccc ">${password}</b>
        </p>
      </div>`;
};

module.exports = { accessDataMail };
