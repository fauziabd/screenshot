module.exports = async (req, res) => {
  if (!req.query.title) return res.status(400).send("Please set the title query params!");
  try {
    const toReplace = ["{{title}}", "{{image}}", "{{driver}}", "{{passenger}}", "{{rear}}"]
    const toCheck = [req.query.title, req.query.image, req.query.driver, req.query.passenger, req.query.rear]
    let file = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ImageShot</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><style>body,html{height:100%;width:100%;margin:0;padding:0;font-family:Inter,sans-serif}.container{display:flex;flex-direction:column;width:1200px;height:630px;max-width:1200px;max-height:630px;box-sizing:border-box;overflow:hidden;padding:50px 100px;background-image:linear-gradient(315deg,#fc00ff 0,#00dbde 100%);justify-content:space-between}.title{width:100%;font-size:45px;text-align:center;margin:0;padding:0;height:50px;color:#fff}.info{display:flex;flex-direction:row;gap:50px;height:320px}.image{width:50%;height:100%;object-fit:cover;border-radius:10px}.image img,.image object{width:100%;height:100%;object-fit:cover;border-radius:10px}.detail{width:50%;display:flex;flex-direction:column;justify-content:space-between}.detail h2{background:#333;color:#fff;padding:25px 25px 25px 30px;border-radius:10px;font-size:25px;margin:0}.logo{text-align:center;font-size:25px;margin:0;padding:0;color:#fff}</style></head><body><div class="container"><h1 class="title">{{title}}</h1><div class="info"><div class="image"><object data="{{image}}" type="image/png"><img src="https://via.placeholder.com/600" alt="image"></object></div><div class="detail"><h2 class="driver">Driver's side size: {{driver}}</h2><h2 class="passenger">Passenger side size: {{passenger}}</h2><h2 class="rear">Rear side size: {{rear}}</h2></div></div><h3 class="logo">DriveSpecs</h3></div></body></html>`;
    toReplace.forEach((v, i) => {
        if(toCheck[i]){
            file.replace(v, decodeURIComponent(toCheck[i]))
        }
    });
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(file);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}
