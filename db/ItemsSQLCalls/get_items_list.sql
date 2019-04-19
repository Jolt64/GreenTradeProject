select li_id, li_user, li_points, li_title, li_description, li_zip, li_user_contact, li_timestamp, it_img from list_item
join img_table on list_item.li_img = img_table.it_id
order by li_id desc