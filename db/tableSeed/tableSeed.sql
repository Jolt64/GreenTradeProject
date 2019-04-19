CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"user_firstName" varchar(50) NOT NULL,
	"user_lastName" varchar(50) NOT NULL,
	"user_userName" varchar(100) NOT NULL,
	"user_email" varchar(100) NOT NULL,
	"user_password" varchar(100) NOT NULL,
	"user_zip" integer NOT NULL,
	"user_img" varchar(5000),
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "points_category" (
	"pc_id" serial NOT NULL,
	"pc_item_category" varchar(50) NOT NULL,
	"pc_points_per_action" integer NOT NULL,
	CONSTRAINT points_category_pk PRIMARY KEY ("pc_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "points_action" (
	"pa_id" serial NOT NULL,
	"pa_item" INT NOT NULL,
	"pa_user" INT NOT NULL,
	CONSTRAINT points_action_pk PRIMARY KEY ("pa_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "list_item" (
	"li_id" serial NOT NULL,
	"li_user" INT NOT NULL,
	"li_points" INT NOT NULL,
	"li_img" integer NOT NULL,
	"li_title" varchar(200) NOT NULL,
	"li_description" varchar(4000) NOT NULL,
	"li_zip" integer NOT NULL,
	"li_user_contact" varchar(200) NOT NULL,
	"li_timestamp" varchar(50) NOT NULL,
	CONSTRAINT list_item_pk PRIMARY KEY ("li_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "chat" (
	"chat_id" serial NOT NULL,
	"chat_req_user" INT NOT NULL,
	"chat_item_user" INT NOT NULL,
	CONSTRAINT chat_pk PRIMARY KEY ("chat_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "chat_line" (
	"cl_id" serial NOT NULL,
	"cl_text" varchar(250) NOT NULL,
	"cl_img" varchar(5000),
	"cl_chat_id" integer NOT NULL,
	CONSTRAINT chat_line_pk PRIMARY KEY ("cl_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "finished_projects_list" (
	"fpl_id" serial NOT NULL,
	"fpl_project_name" varchar(50) NOT NULL,
	"fpl_user" INT NOT NULL,
	"fpl_starting_img" integer,
	"fpl_end_img" integer,
	"fpl_discription" varchar(5000) NOT NULL,
	CONSTRAINT finished_projects_list_pk PRIMARY KEY ("fpl_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "img_table" (
	"it_id" serial NOT NULL,
	"it_user_id" int NOT NULL,
	"it_img" varchar(5000) NOT NULL,
	CONSTRAINT img_table_pk PRIMARY KEY ("it_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "points_action" ADD CONSTRAINT "points_action_fk0" FOREIGN KEY ("pa_item") REFERENCES "points_category"("pc_id");
ALTER TABLE "points_action" ADD CONSTRAINT "points_action_fk1" FOREIGN KEY ("pa_user") REFERENCES "users"("user_id");

ALTER TABLE "list_item" ADD CONSTRAINT "list_item_fk0" FOREIGN KEY ("li_user") REFERENCES "users"("user_id");
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_fk1" FOREIGN KEY ("li_points") REFERENCES "points_category"("pc_id");
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_fk2" FOREIGN KEY ("li_img") REFERENCES "img_table"("it_id");

ALTER TABLE "chat" ADD CONSTRAINT "chat_fk0" FOREIGN KEY ("chat_req_user") REFERENCES "users"("user_id");
ALTER TABLE "chat" ADD CONSTRAINT "chat_fk1" FOREIGN KEY ("chat_item_user") REFERENCES "users"("user_id");

ALTER TABLE "chat_line" ADD CONSTRAINT "chat_line_fk0" FOREIGN KEY ("cl_chat_id") REFERENCES "chat"("chat_id");

ALTER TABLE "finished_projects_list" ADD CONSTRAINT "finished_projects_list_fk0" FOREIGN KEY ("fpl_user") REFERENCES "users"("user_id");
ALTER TABLE "finished_projects_list" ADD CONSTRAINT "finished_projects_list_fk1" FOREIGN KEY ("fpl_starting_img") REFERENCES "img_table"("it_id");
ALTER TABLE "finished_projects_list" ADD CONSTRAINT "finished_projects_list_fk2" FOREIGN KEY ("fpl_end_img") REFERENCES "img_table"("it_id");

ALTER TABLE "img_table" ADD CONSTRAINT "img_table_fk0" FOREIGN KEY ("it_user_id") REFERENCES "users"("user_id");


