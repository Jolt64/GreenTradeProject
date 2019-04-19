update users
set
    "user_firstName" = $1,
    "user_lastName" = $2,
    "user_userName" = $3,
    "user_email" = $4,
    "user_password" = $5,
    "user_zip" = $6,
    "user_img" = $7
where user_email = $4
returning 
    "user_firstName",
    "user_lastName",
    "user_userName",
    "user_email",
    "user_zip",
    "user_img",
    "user_id";