const DISH = require("../models/dishes");

async function handleDishInsert(req, res) {
    const { dishId, dishName, imageUrl, isPublished } = req.body;
    console.log('body',req.body);
    try {
        if (!dishId || !dishName || !imageUrl) {
            return res.status(400).json({ error: "dishId, dishName, and imageUrl are required" });
        }

        const newDish = await DISH.create({
            dishId,
            dishName,
            imageUrl,
            isPublished: !!isPublished, 
        });

        return res.status(201).redirect("/dishes");
    } catch (error) {
        console.error("Error inserting dish:", error);
        return res.status(500).json({ error: "Failed to insert dish" });
    }
}

module.exports = {
    handleDishInsert,
};
