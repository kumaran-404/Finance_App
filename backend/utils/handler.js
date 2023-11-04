function SuccessMessage(data, res) {
  return res.status(200).json({
    msg: "Success",
    error: "",
    data: data,
  });
}

function ErrorMessage(error, res) {
  return res.status(400).json({
    msg: "",
    error: error,
    data: "",
  });
}

function tokenErrorMessage(res) {
  return res.status(498).json({
    msg: "",
    error: "Token not Found",
    data: "",
  });
}

module.exports = {
  SuccessMessage,
  ErrorMessage,
  tokenErrorMessage,
};
