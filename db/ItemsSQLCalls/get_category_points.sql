select DISTINCT ON(pc_points_per_action) pc_points_per_action from points_category
WHERE pc_item_category = $1