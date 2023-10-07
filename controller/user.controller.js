const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const multer = require("multer");
const path = require("path");


//create main model
const user = db.user;

const loginUser = async (req, res)=> {
  const email = req.body.email;
  const password = req.body.password;
  

  await user.findOne({
    where: {
      email: email,
    },
  })
    .then(function (result) {
      let passwordHash = result.password;
      let checkPassword = bcrypt.compareSync(password, passwordHash);

      if (checkPassword) {
        res.json({
          message: "Berhasil Login",
          token: jwt.sign({ id: result.id }, "asrul-dev"),
          email : req.body.email
        });
      } else {
        res.json({
          message: "Gagal Login",
        });
      }
    })
    .catch(function (error) {
      res.json({ error: error });
    });
}


const logout = async (req, res) =>{
  

 await req.logout()
    .catch(function (error) {
      res.json({ error: error });
    });

    res.json({
      message: "Berhasil Logout",
    });
}


const createUser = async (req, res) => {


  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);

  let info = {
    name: req.body.name,
    picture: req.file.path,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
  };
  const users = await user.create(info);
  res.status(200).send(users);
  console.log(users);
};



// function createUser(req, res) {
//   let salt = bcrypt.genSaltSync(10);
//   let hash = bcrypt.hashSync(req.body.password, salt);
//   let decodedId = req.decoded.id;

//   if (Number(decodedId) === Number(req.params.id)) {

//   model.User.create({
//     name: req.body.name,
//     label: req.body.label,
//     picture: req.body.picture,
//     email: req.body.email,
//     phone: req.body.phone,
//     website: req.body.website,
//     summary: req.body.summary,
//     password: hash,
//   })
//     .then(function (result) {
//       res.json(result);
//     })
//     .catch(function (error) {
//       res.json({ error: error });
//     });
// } else {
//     res.json({
//       message: "Ini bukan data Anda",
//     });
//   }
    
// }

const readUser = async (req, res) => {
  try {
    let users = await user.findAll({});

    if (!users) {
      res.send("user not found");
    }
    res.status(200).send(users);
  } catch (error) {
    res.json(error);
  }
};

const updateUser = async (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  try {
    let id = req.params.id;
    console.log(req.body);
    let info = {
      name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
    };
    if (req.file) {
      const img = req.file.path;
      info.image = img;
    }
    let users = await user.update(info, { where: { id: id } });
    console.log(users);
    res.status(200).send("Users updated");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  await user.destroy({ where: { id: id } });
  res.status(200).json("User has been deleted....");
};




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

  
module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
    logout,
    upload,
};