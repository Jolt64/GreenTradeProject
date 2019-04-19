insert into list_item (
	"li_user",

	"li_points",

	"li_title",
	"li_img",
	"li_description",
	"li_zip",
	"li_user_contact",
	"li_timestamp"
) values (
    ${userId},

    ${categoryHolder},
    
    ${title},
    ${imageIdHolder},
    ${description},
    ${zip},
    ${userContact},
    ${timeStamp}
)
