

module.exports = {
    getItems: async (req, res) => {
        const db = req.app.get('db');
        const items = await db.ItemsSQLCalls.get_items_list(0);
        res.status(200).send(items)
    },

    getItemsCategorys: async (req, res) => {
        const db = req.app.get('db');
        const categorys = await db.ItemsSQLCalls.get_categorys();
        res.status(200).send(categorys)
    },

    getItemsCategoryPoints: async (req, res) => {
        const { category } = req.body;
        const db = req.app.get('db');
        const categorys = await db.ItemsSQLCalls.get_category_points(category);
        res.status(200).send(categorys)
    },

    createNewItemPost: async (req, res) => {
        const { userId, title, category, points, showingImg, description, zip, userContact, timeStamp } = req.body
        const db = req.app.get('db');
        const pointsCategory = await db.ItemsSQLCalls.find_points_category(category, points)
        const imageId = await db.AddImages.add_image(showingImg, userId)
        let imageIdHolder = imageId[0].it_id
        let categoryHolder = pointsCategory[0].pc_id
        const categorys = await db.ItemsSQLCalls.create_item_post({userId, title, categoryHolder , imageIdHolder, description, zip, userContact, timeStamp});
        res.status(200).send(categorys)
    },

    getUsersListedItems: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const items = await db.ItemsSQLCalls.get_users_listed_items(id);
        res.status(200).send(items)
    },

    deletePostedItem: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        await db.ItemsSQLCalls.delete_posted_item(id);
        res.status(200).send({message: "Item Has Been Deleted"})
    }
}