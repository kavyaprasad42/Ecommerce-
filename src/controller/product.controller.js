var User = require('../model/product.model');
const express = require('express');

module.exports.addproduct = (req,res) =>
{
  res.render('insertproduct')
}
const Product = require('../model/product.model');

module.exports.getAllProduct= async(req,res)=>{
  try{
    let Products = await Product.find();
    res.render('listproduct',{Products});
  }
  catch (error){
  res.send({success:false,error})
}
}

module.exports.createProduct =async(req,res)=>
{
  try{
    console.log(req.body);
    // console.log("xyz")
    const {name,category,price,desc} = req.body;
    let product = new Product({name,category,price,desc});
    let result = await product.save();
    console.log(result);
    res.redirect("/create");
    // res.send({success:true});
  }
  catch (error)
  {
    res.send(error)
  }
}

module.exports.showAddProduct = (req,res) =>
{
  res.render('insertproduct')
}

module.exports.showupdateProduct = (req,res) =>
{
  res.render('updateproduct')
}

module.exports.deleteProduct =async(req,res) =>{
  console.log("ID = " + req.params.id);

try{
  let result = await Product.deleteOne({_id:req.params.id})
  console.log("Result is" + JSON.stringify(result))
  res.send("record deleted")
}
  catch(error){
    console.log(error);
  }
}
module.exports.search=async(req,res)=>{
    let {category} = req.body;
    console.log(category)
    let Products = await Product.find({category:category})
    console.log(Products.length)
    if(Products.length > 0)
    {
    res.render('listproduct',{Products})
    }
    else{res.send("no products found")}
category

}
module.exports.updateproduct = async(req,res) => {
    var Products = await Product.findOne({_id: req.params.id});
    // console.log(JSON.stringify(products));
    id = req.params.id
    res.render("updateproduct",{Products});
}
module.exports.saveupdate = async(req,res) => {
console.log("ID = " + id)
try{
    let result = await Product.updateOne({_id: id}, {$set:{name: req.body.name , price: req.body.price, desc:req.body.desc,category:req.body.category}})
    console.log("Result is " + JSON.stringify(result))
    res.redirect("/")
}
catch(error){
    res.send(error)
}
}
module.exports.usergetAllProduct =async (req,res) =>
{
    let Products = await Product.find();
  res.render('userviewproducts',{Products})
}