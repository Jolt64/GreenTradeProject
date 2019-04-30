select li_id, li_user, pc_points_per_action, li_title, li_description, li_zip, li_user_contact, li_timestamp, it_img from list_item
join img_table on list_item.li_img = img_table.it_id
join points_category on list_item.li_points = points_category.pc_id
where LOWER(pc_item_category) like LOWER('%' || $1 || '%')
order by li_id desc