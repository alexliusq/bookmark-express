CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "title" text UNIQUE NOT NULL,
  "isbn" text,
  "goodreads_details_id" int,
  "calibre_metadata_id" int
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY,
  "email" text UNIQUE,
  "password" text
);

CREATE TABLE IF NOT EXISTS "users_books" (
  "user_id" uuid NOT NULL,
  "book_id" id NOT NULL
)

CREATE INDEX users_email on users (email);

ALTER TABLE "users_books" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "users_books" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;


CREATE TABLE "goodreads_details" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "isbn13" varchar,
  "kindle_asin" varchar,
  "marketplace_id" varchar,
  "image_url" varchar,
  "language_code" varchar(3),
  "publisher" varchar,
  "publication_year" varchar(4),
  "publication_month" varchar(2),
  "publication_day" varchar(2),
  "is_ebook" bool,
  "description" text
);

CREATE TABLE "kindle_annotations" (
  "id" SERIAL PRIMARY KEY,
  "user_id" uuid UNIQUE,
  "book_id" int,
  "bookline" text,
  "title" text,
  "author" text,
  "language" varchar(3),
  "begin" int,
  "end" int,
  "time" timestamp,
  "highlight" text,
  "note" text,
  "statusline" text,
  "page" text,
  "ordernr" int,
  "edited" boolean DEFAULT false
);

CREATE TABLE "annotations_tags" (
  "annotation_id" int NOT NULL,
  "tag_id" int NOT NULL
);

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "user_id" uuid UNIQUE,
  "tag" text NOT NULL
);

CREATE TABLE "calibre_authors" (
  "id" SERIAL PRIMARY KEY,
  "author" text UNIQUE,
  "author_sort" text
);

CREATE TABLE "calibre_authors_books" (
  "author_id" int NOT NULL,
  "book_id" int NOT NULL
);

CREATE TABLE "calibre_metadata" (
  "id" SERIAL PRIMARY KEY,
  "isbn" text UNIQUE,
  "amazon" text,
  "title" text,
  "title_sort" text,
  "publisher" text,
  "pubdate" date,
  "comments" text,
  "cover" bool,
  "series" text
);

ALTER TABLE "books" ADD FOREIGN KEY ("calibre_metadata_id") REFERENCES "calibre_metadata" ("id");

ALTER TABLE "books" ADD FOREIGN KEY ("goodreads_details_id") REFERENCES "goodreads_details" ("id") ON DELETE CASCADE;

ALTER TABLE "kindle_annotations" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "calibre_authors_books" ADD FOREIGN KEY ("author_id") REFERENCES "calibre_authors" ("id");

ALTER TABLE "calibre_authors_books" ADD FOREIGN KEY ("book_id") REFERENCES "calibre_metadata" ("id");

ALTER TABLE "calibre_authors_books" ADD PRIMARY KEY ("author_id", "book_id");

ALTER TABLE "annotations_tags" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE;

ALTER TABLE "annotations_tags" ADD CONSTRAINT annotation_id_tag_id_key UNIQUE(annotation_id, tag_id);