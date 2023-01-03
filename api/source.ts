import { getCode } from "./_lib/puppeteer-code";

module.exports = async (req, res) => {
  if (!req.query.url) return res.status(400).send("No url query specified.");
  if (!checkUrl(req.query.url)) return res.status(400).send("Invalid url query specified.");
  try {
    const file = await getCode(req.query.url);
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, immutable, no-transform, s-maxage=86400, max-age=86400");
    res.status(200).end(file);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}

function checkUrl(string, hostname) {
  var url = "";
  try {
    url = new URL(decodeURIComponent(string));
  } catch (error) {
    return false;
  }
  return true;
}