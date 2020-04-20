CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "completed_bool" bool NOT NULL,
  -- "summary" text,
  -- "comments" text,
  -- "slug" text,
  "goodreads_details_id" int
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

ALTER TABLE "books" ADD FOREIGN KEY ("goodreads_details_id") REFERENCES "goodreads_details" ("id") ON DELETE CASCADE;
