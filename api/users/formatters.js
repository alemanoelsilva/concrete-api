exports.formatterUserRequest = ({ arrayObjectToString }) => user => ({
  name: user.name,
  email: user.email,
  password: user.password,
  phones: arrayObjectToString(user.phones),
});

exports.formatterUserResponse = ({ moment, formatDate, stringToArrayObject }) => user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  phones: stringToArrayObject(user.phones),
  createdAt: moment(user.createdAt).format(formatDate),
  updatedAt: moment(user.updatedAt).format(formatDate),
  lastLogin: moment(user.lastLogin).format(formatDate),
  token: user.token,
});

exports.addMinutesOnDate = ({ moment, addTime }) => date => moment(date).add(addTime, 'm');

exports.getCurrentDate = ({ moment }) => () => moment();
