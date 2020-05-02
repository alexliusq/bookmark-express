CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "title" text UNIQUE NOT NULL,
  "completed_bool" bool NOT NULL,
  "isbn" text,
  "goodreads_details_id" int,
  "calibre_metadata_id" int
);

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
  "book_id" int,
  "kind" text,
  "bookline" text,
  "title" text,
  "author" text,
  "language" varchar(3),
  "begin" int,
  "end" int,
  "time" timestamp,
  "text" text,
  "statusline" text UNIQUE,
  "ordernr" int,
  "page" text
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