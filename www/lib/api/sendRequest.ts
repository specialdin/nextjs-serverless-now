import 'isomorphic-unfetch';

function getRootUrl(req) {
  // The optional request object `req` only exists server side, `window` is only client side
  // When in development mode, host is always http://localhost:3001
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001';
  }
  return req ? `https://${req.headers.host}` : `https://${window.location.host}`;
}

export default async function sendRequest(req, path, opts: any = {}) {
  const headers = Object.assign({}, opts.headers || {}, {
    'Content-type': 'application/json; charset=UTF-8'
  });

  const response = await fetch(
    `${getRootUrl(req)}${path}`,
    Object.assign({ method: 'POST', credentials: 'same-origin' }, opts, { headers })
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
