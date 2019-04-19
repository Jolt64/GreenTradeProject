insert into img_table (
    it_img,
    it_user_id
)
Values (
    $1,
    $2
)returning 
    it_id