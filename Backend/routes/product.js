const Product = require("../models/Product");
const {verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();



//ONLY ADD CAN CREATE PRODUCT 
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ONLY ADD CAN UPDATE PRODUCT 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ONLY ADD CAN DELETE PRODUCT 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(500).json("Product not found");
    }
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});


//GET Product
//Everybody can see
router.get("/find/:id", async (req, res) => {
  try {
    const getProduct = await Product.findById(req.params.id);
    if (!getProduct) {
      res.status(500).json("Product not found");
    }
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL Products
//Everybody can see
router.get("/",async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
 
  try {
    let Products;
    if (qNew) {
      Products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } 
    else if (qCategory) {
      
        Products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      
    } else {
      Products = await Product.find();
    }
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
