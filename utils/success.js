const success = (res, status, success, message, result) => {
    res.statusMessage = message;
    res.status(status).json({
      status: status,
      success: success,
      message: message,
      data: result,
    }).end();
  };
  const successToken = (res, status, success, message, result, token) => {
    res.statusMessage = message;
    res
      .status(status)
      .json({
        status: status,
        success: success,
        message: message,
        data: result,
        token: token,
      })
      .end();
  };
  
  
  module.exports = { success , successToken }