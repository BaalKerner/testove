// I would use @hapi/joi in real project but I don't want to do it now
module.exports.validate = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('No name specified or it\'s type is not string');
  }

  if (!data.releaseDate || typeof data.releaseDate !== 'number') {
    errors.push('No releaseDate specified or it\'s type is not string');
  }

  if (!data.authorName || typeof data.authorName !== 'string') {
    errors.push('No authorName specified or it\'s type is not string');
  }

  return { data, errors };
};
