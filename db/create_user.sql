insert into users (
    "user_firstName",
    "user_lastName",
    "user_userName",
    "user_email",
    "user_password",
    "user_zip",
    "user_img"
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
) returning 
    "user_firstName",
    "user_lastName",
    "user_userName",
    "user_email",
    "user_zip",
    "user_img",
    "user_id";