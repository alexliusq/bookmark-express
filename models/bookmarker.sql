CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "completed_bool" bool NOT NULL,
  "isbn" text,
  "goodreads_details_id" int,
  "calibre_metadata_id" int
);

CREATE TABLE "goodreads_details" (
  "id" int PRIMARY KEY,
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
  "id" int PRIMARY KEY,
  "book_id" int,
  "bookline" text,
  "author" text,
  "language" varchar(3),
  "begin" int,
  "end" int,
  "time" timestamp,
  "text" text,
  "statusline" text,
  "ordernr" int,
  "page" text
);

CREATE TABLE "calibre_authors" (
  "id" int PRIMARY KEY,
  "author" text,
  "author_sort" text
);

CREATE TABLE "calibre_authors_books" (
  "id" int PRIMARY KEY,
  "author_id" int,
  "book_id" int
);

CREATE TABLE "calibre_metadata" (
  "id" int PRIMARY KEY,
  "isbn" text,
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
