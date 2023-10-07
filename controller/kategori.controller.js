const model = require("../models");
const db = require("../models");

const Categoryku = db.category;




  const createCategory = async (req, res) => {
    // if (Number(decodedId) === Number(req.params.id)) {

    let info = {
      category_name: req.body.category_name,
      
    };
    const categoryName = await Categoryku.create(info);
    res.status(200).send(categoryName);
    console.log(categoryName);
    //   } else {
//       res.json({
//         message: "Ini bukan data Anda",
//       });
//     }
  };
  

  
  
  const readCategory =  async (req, res) =>{
    try {
      let category = await Categoryku.findAll({});
  
      if (!category) {
        res.send("Job post not found");
      }
      res.status(200).send(category);
    } catch (error) {
      res.json(error);
    }
      // let decodedId = req.decoded.id;
  
      // if (Number(decodedId) === Number(req.params.id)) {
      } 
      // else {
      //     res.json({
      //       message: "Ini bukan data Anda",
      //     });
      //   }
  // }


  const updateCategory = async (req, res) => {
       //   let decodedId = req.decoded.id;
    
    //   if (Number(decodedId) === Number(req.params.id)) {
    try {
      let id = req.params.id;
      console.log(req.body);
      let info = {
        category_name: req.body.category_name,
      };

      let category = await Categoryku.update(info, { where: { id: id } });
      console.log(category);
      res.status(200).send("Kategori updated");
    } catch (err) {
      res.status(500).send({ message: err.message });
    }

        //   } else {
    //     res.json({
    //       message: "Ini bukan data Anda",
    //     });
    //   }
  };

  const deleteCategory = async (req, res) => {
    let id = req.params.id;
    await Categoryku.destroy({ where: { id: id } });
    res.status(200).json("Kategori has been deleted....");
  };



  
 
  module.exports = {
      createCategory,
      readCategory,
      updateCategory,
      deleteCategory,
  };